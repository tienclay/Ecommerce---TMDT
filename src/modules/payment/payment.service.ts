// src/services/payment.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  Order,
  OrderStatus,
  Payment,
  PaymentMethod,
  PaymentStatus,
} from '@entities';
import { CreatePaymentDto } from './dto/create-payment.dto';
import {
  EcommerceBadRequestException,
  EcommerceNotFoundException,
  InternalServerError,
} from '@exceptions';
import { SendCreatePaymentDto } from './dto/send-create-payment.dto';
import { PaymentResponseDto } from './dto/payment-response.dto';
import { PaymentLinkDto } from './dto/payment-link.dto';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}
  private readonly MAX_RETRIES = 5;
  private readonly RETRY_DELAY = 1000;

  private generateOrderCode(): number {
    return Math.floor(100000000 + Math.random() * 900000000);
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  private async createPaymentWithRetry(
    order: Order,
    returnUrl: string,
    cancelUrl: string,
    attempt = 1,
  ): Promise<PaymentResponseDto> {
    try {
      const orderCode = this.generateOrderCode();

      const payload: SendCreatePaymentDto = {
        orderCode: Number(orderCode),
        amount: Number(order.totalAmount),
        description: `Order ${orderCode}`,
        cancelUrl: cancelUrl || this.configService.get<string>('CANCEL_URL'),
        returnUrl: returnUrl || this.configService.get<string>('RETURN_URL'),
      };

      const response = await firstValueFrom(
        this.httpService.post(`/payments/create`, payload),
      );

      return response.data.data;
    } catch (error) {
      if (attempt >= this.MAX_RETRIES) {
        throw new InternalServerError();
      }

      console.log(
        `Payment creation failed, retrying with new order code. Attempt ${attempt + 1}`,
      );
      await this.sleep(this.RETRY_DELAY);

      return this.createPaymentWithRetry(
        order,
        returnUrl,
        cancelUrl,
        attempt + 1,
      );
    }
  }
  async createPayment(
    createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentResponseDto> {
    try {
      const { orderId, returnUrl, cancelUrl } = createPaymentDto;
      const order = await this.orderRepository.findOne({
        where: { id: orderId },
        relations: ['student'],
      });

      if (!order) {
        throw new EcommerceNotFoundException('Order not found');
      }

      if (order.status === OrderStatus.COMPLETED) {
        throw new EcommerceBadRequestException('Order has been completed');
      }

      const responseData: PaymentResponseDto =
        await this.createPaymentWithRetry(order, returnUrl, cancelUrl);
      if (!responseData) {
        throw new InternalServerError();
      }
      console.log('responseData.orderCode :>> ', responseData.orderCode);
      const responseInfo = await firstValueFrom(
        this.httpService.get(`/payments/${responseData.orderCode}`),
      );
      if (!responseInfo) {
        throw new InternalServerError();
      }
      const paymentInfo: PaymentLinkDto = responseInfo.data;

      const paymentDto: PaymentDto = {
        userId: order.student.id,
        orderId: order.id,
        amount: order.totalAmount,
        paymentMethod: PaymentMethod.BANK_TRANSFER,
        status: PaymentStatus.PENDING,
        paymentLinkId: paymentInfo.id,
        checkoutUrl: responseData.checkoutUrl,
        qrCode: responseData.qrCode,
        cancellationReason: paymentInfo.cancellationReason,
        orderCode: responseData.orderCode,
      };

      await this.createPaymentRecord(paymentDto);

      // Lưu thông tin Payment vào cơ sở dữ liệu

      return responseData;
    } catch (error) {
      console.log('error.message :>> ', error.message);
      throw new InternalServerError();
    }
  }

  async createPaymentRecord(
    createPaymentRecordDto: PaymentDto,
  ): Promise<Payment> {
    try {
      const payment = this.paymentRepository.create(createPaymentRecordDto);
      return await this.paymentRepository.save(payment);
    } catch (error) {
      throw new InternalServerError();
    }
  }
}
