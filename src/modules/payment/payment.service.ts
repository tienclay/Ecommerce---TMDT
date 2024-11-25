// src/services/payment.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as crypto from 'crypto';
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
  EcommerceNotAcceptableException,
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

      const payload: SendCreatePaymentDto = {
        orderCode: Number(order.id),
        amount: order.totalAmount,
        description: `Thanh toán đơn hàng ${order.id}`,
        cancelUrl: cancelUrl || this.configService.get<string>('CANCEL_URL'),
        returnUrl: returnUrl || this.configService.get<string>('RETURN_URL'),
      };

      const response = await firstValueFrom(
        this.httpService.post(`/payments/create`, payload),
      );

      const responseData: PaymentResponseDto = response.data;

      if (!responseData) {
        throw new InternalServerError();
      }

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
      };

      await this.createPaymentRecord(paymentDto);

      // Lưu thông tin Payment vào cơ sở dữ liệu

      return responseData;
    } catch (error) {
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

  // Lấy thông tin thanh toán
  // async getPaymentInfo(id: string | number) {
  //   const headers = {
  //     'x-client-id': this.clientId,
  //     'x-api-key': this.apiKey,
  //   };

  //   try {
  //     const response = await firstValueFrom(
  //       this.httpService.get(`/v2/payment-requests/${id}`, {
  //         headers,
  //       }),
  //     );

  //     const responseData = response.data;

  //     if (responseData.code !== '00') {
  //       throw new HttpException(responseData.desc, HttpStatus.BAD_REQUEST);
  //     }

  //     return responseData.data;
  //   } catch (error) {
  //     const errorMessage =
  //       error.response?.data?.desc || 'Không thể lấy thông tin thanh toán';
  //     throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
  //   }
  // }

  // // Hủy link thanh toán
  // async cancelPayment(
  //   id: string,
  //   cancellationReason?: string,
  // ): Promise<PaymentLinkDto> {
  //   const payload = {
  //     cancellationReason,
  //   };

  //   const headers = {
  //     'x-client-id': this.clientId,
  //     'x-api-key': this.apiKey,
  //   };

  //   try {
  //     const response = await firstValueFrom(
  //       this.httpService.post(`/v2/payment-requests/${id}/cancel`, payload, {
  //         headers,
  //       }),
  //     );

  //     const responseData = response.data;

  //     if (responseData.code !== '00') {
  //       throw new HttpException(responseData.desc, HttpStatus.BAD_REQUEST);
  //     }

  //     // Cập nhật trạng thái thanh toán trong cơ sở dữ liệu
  //     const payment = await this.paymentRepository.findOne({
  //       where: [{ orderId: id }, { paymentLinkId: id }],
  //     });
  //     if (payment) {
  //       payment.status = PaymentStatus.CANCELLED;
  //       payment.cancellationReason = cancellationReason;
  //       await this.paymentRepository.save(payment);
  //     }

  //     return {
  //       message: 'Hủy link thanh toán thành công',
  //     };
  //   } catch (error) {
  //     const errorMessage =
  //       error.response?.data?.desc || 'Không thể hủy link thanh toán';
  //     throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
  //   }
  // }

  // // Xác minh dữ liệu webhook
  // verifyWebhookData(webhookData: any): boolean {
  //   const signature = webhookData.signature;
  //   const data = webhookData.data;

  //   const signatureData = `amount=${data.amount}&description=${data.description}&orderCode=${data.orderCode}`;

  //   const calculatedSignature = crypto
  //     .createHmac('sha256', this.checksumKey)
  //     .update(signatureData)
  //     .digest('hex');

  //   return calculatedSignature === signature;
  // }

  // // Xử lý dữ liệu webhook
  // async handleWebhook(webhookData: any) {
  //   const isValid = this.verifyWebhookData(webhookData);

  //   if (!isValid) {
  //     throw new HttpException('Chữ ký không hợp lệ', HttpStatus.BAD_REQUEST);
  //   }

  //   const data = webhookData.data;

  //   // Cập nhật trạng thái thanh toán
  //   const payment = await this.paymentRepository.findOne({
  //     where: { orderId: data.orderCode },
  //   });

  //   if (payment) {
  //     payment.status = PaymentStatus.SUCCESS;
  //     await this.paymentRepository.save(payment);

  //     // Cập nhật trạng thái đơn hàng
  //     const order = await this.orderRepository.findOne({
  //       where: { id: data.orderCode },
  //     });

  //     if (order) {
  //       order.status = OrderStatus.COMPLETED;
  //       await this.orderRepository.save(order);
  //     }
  //   }

  //   return {
  //     code: '00',
  //     desc: 'Xử lý webhook thành công',
  //   };
  // }
}
