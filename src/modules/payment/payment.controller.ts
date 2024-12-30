// src/controllers/payment.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service.js';
import { AuthGuard, RolesGuard } from '@guards';
import { Roles } from '@decorators';
import { UserRole } from '@enums';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaymentResponseDto } from './dto/payment-response.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentLinkDto } from './dto/payment-link.dto';
import { ConfirmWebhookDto } from './dto/confirm-webhook.dto';
import { WebhookDataDto, WebhookResponse } from './dto/webhook-data.dto';
import { CancelPaymentDto } from './dto/cancel.dto';

@Controller('payments')
@ApiTags('Payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // Tạo link thanh toán
  @Post('create')
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.STUDENT)
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 201,
    description: 'Create payment successfully',
    type: PaymentResponseDto,
  })
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentResponseDto> {
    return await this.paymentService.createPayment(createPaymentDto);
  }

  // Lấy thông tin thanh toán
  @Get('info/:orderId')
  async getPaymentInfo(@Param('orderId') id: string): Promise<PaymentLinkDto> {
    return await this.paymentService.getPaymentInfo(id);
  }

  // // Hủy link thanh toán
  @Post('cancel/:orderId')
  async cancelPayment(
    @Param('orderId') id: string,
    @Body() cancellationReason: CancelPaymentDto,
  ): Promise<PaymentLinkDto> {
    return await this.paymentService.cancelPayment(id, cancellationReason);
  }

  // Xử lý webhook

  @Post('handle-webhook')
  @HttpCode(200)
  async handleWebhook(@Body() webhookData: any): Promise<WebhookDataDto> {
    return await this.paymentService.handleWebhook(webhookData);
  }

  @Post('confirm-webhook')
  @ApiOperation({ summary: 'Xác nhận webhook' })
  @ApiResponse({
    status: 201,
    description: 'Webhook được xác nhận thành công.',
    schema: {
      example: {
        error: 0,
        message: 'ok',
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Xác nhận webhook thất bại.',
    schema: {
      example: {
        error: -1,
        message: 'failed',
        data: null,
      },
    },
  })
  confirmWebhook(@Body() confirmWebhookDto: ConfirmWebhookDto): Promise<void> {
    return this.paymentService.confirmWebhook(confirmWebhookDto);
  }
}
