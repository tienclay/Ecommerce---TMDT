import { plainToClass } from 'class-transformer';
// src/services/payment.service.ts

import { Injectable, Logger } from '@nestjs/common';
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
import { ConfirmWebhookDto } from './dto/confirm-webhook.dto';
import { WebhookDataDto, WebhookResponse } from './dto/webhook-data.dto';
import { CancelPaymentDto } from './dto/cancel.dto';
import PayOS from '@payos/node';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ItemDto } from './dto/event-order.dto.js';

@Injectable()
export class PaymentService {
  private payOS: PayOS;
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private configService: ConfigService,
    private httpService: HttpService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.payOS = new PayOS(
      process.env.PAYOS_CLIENT_ID,
      process.env.PAYOS_API_KEY,
      process.env.PAYOS_CHECKSUM_KEY,
    );
  }
  private readonly logger = new Logger(PaymentService.name);

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
      this.logger.error(error);
      if (attempt >= this.MAX_RETRIES) {
        throw new EcommerceBadRequestException('Payment creation failed');
      }

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

      if (order.status === OrderStatus.CANCELLED) {
        throw new EcommerceBadRequestException('Order has been cancelled');
      }

      if (order.status === OrderStatus.PROCESSING) {
        const payment = await this.paymentRepository.findOne({
          where: { orderId },
        });
        const checkoutUrl = payment.checkoutUrl;
        return plainToClass(PaymentResponseDto, { checkoutUrl });
      }

      const responseData: PaymentResponseDto =
        await this.createPaymentWithRetry(order, returnUrl, cancelUrl);
      if (!responseData) {
        throw new EcommerceBadRequestException('Payment creation failed');
      }
      const responseInfo = await firstValueFrom(
        this.httpService.get(`/payments/${responseData.orderCode}`),
      );
      if (!responseInfo) {
        throw new EcommerceBadRequestException('Not found payment info');
      }
      const paymentInfo: PaymentLinkDto = responseInfo.data.data;
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

      //change order status to processing
      order.status = OrderStatus.PROCESSING;
      await this.orderRepository.save(order);

      return plainToClass(PaymentResponseDto, responseData);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async createPaymentRecord(
    createPaymentRecordDto: PaymentDto,
  ): Promise<Payment> {
    try {
      const payment = this.paymentRepository.create(createPaymentRecordDto);
      return await this.paymentRepository.save(payment);
    } catch (error) {
      this.logger.error(error);
      throw new EcommerceBadRequestException('Create payment record failed');
    }
  }

  async getPaymentInfo(orderId: string): Promise<PaymentLinkDto> {
    try {
      const payment = await this.paymentRepository.findOne({
        where: { orderId },
      });
      if (!payment) {
        throw new EcommerceNotFoundException('Payment not found');
      }
      const orderCode = payment.orderCode;
      const response = await firstValueFrom(
        this.httpService.get(`/payments/${orderCode}`),
      );
      return plainToClass(PaymentLinkDto, response.data.data);
    } catch (error) {
      this.logger.error(error);
      throw new EcommerceBadRequestException('Get payment info failed');
    }
  }

  async cancelPayment(
    orderId: string,
    cancellationReason: CancelPaymentDto,
  ): Promise<PaymentLinkDto> {
    try {
      const payment = await this.paymentRepository.findOne({
        where: { orderId },
      });

      if (!payment) {
        throw new EcommerceNotFoundException('Payment not found');
      }

      const orderCode = payment.orderCode;
      const response = await firstValueFrom(
        this.httpService.put(`/payments/${orderCode}`, cancellationReason),
      );

      payment.status = PaymentStatus.CANCELLED;
      payment.cancellationReason = cancellationReason.cancellationReason;
      await this.paymentRepository.save(payment);
      const order = await this.orderRepository.findOne({
        where: { id: orderId },
      });
      order.status = OrderStatus.CANCELLED;
      await this.orderRepository.save(order);

      return plainToClass(PaymentLinkDto, response.data.data);
    } catch (error) {
      this.logger.error(error);
      throw new EcommerceBadRequestException('Cancel payment failed');
    }
  }

  verifyPaymentWebhookData(data): WebhookDataDto {
    return this.payOS.verifyPaymentWebhookData(data);
  }

  async handleWebhook(body: any): Promise<WebhookDataDto> {
    try {
      const webhookData = this.verifyPaymentWebhookData(body);
      if (
        ['Ma giao dich thu nghiem', 'VQRIO123'].includes(
          webhookData.description,
        )
      ) {
        return webhookData;
      }
      const data = webhookData;
      if (data.desc != 'success') {
        return;
      }
      const payment = await this.paymentRepository.findOne({
        where: { paymentLinkId: data.paymentLinkId },
      });
      if (!payment) {
        return;
      }
      if (payment.amount != data.amount) {
        return;
      }
      payment.status = PaymentStatus.SUCCESS;
      this.paymentRepository.save(payment);
      const order = await this.orderRepository.findOne({
        where: { id: payment.orderId },
        relations: ['student'],
      });
      order.status = OrderStatus.COMPLETED;
      this.orderRepository.save(order);
      // export class itemDto {
      //   name: string;
      //   quantity: number;
      //   price: number;
      // }
      //emit event "order.success"

      this.eventEmitter.emit('order.success', {
        orderId: order.id,
        email: order.student.email,
        name: order.student.username,
      });
    } catch (error) {
      this.logger.error(error);
      throw new EcommerceBadRequestException('Handle webhook failed');
    }
  }

  async confirmWebhook(confirmWebhookDto: ConfirmWebhookDto): Promise<void> {
    try {
      await firstValueFrom(
        this.httpService.post('/payments/confirm-webhook', confirmWebhookDto),
      );
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerError();
    }
  }
}
