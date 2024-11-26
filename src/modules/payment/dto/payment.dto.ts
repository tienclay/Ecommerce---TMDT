import { PaymentMethod, PaymentStatus } from '@entities';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class PaymentDto {
  @ApiProperty({
    description: 'OrderCode',
    example: '123456789101',
  })
  @IsNumber()
  orderCode: number;

  @ApiProperty({
    description: 'User ID associated with the payment',
    example: '12345-abcde',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Order ID associated with the payment',
    example: '54321-edcba',
  })
  @IsString()
  orderId: string;

  @ApiPropertyOptional({
    description: 'Membership ID associated with the payment',
    example: '67890-mnopq',
  })
  @IsOptional()
  @IsString()
  membershipId?: string;

  @ApiProperty({
    description: 'Amount of the payment',
    example: 100.5,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Payment method used for the transaction',
    enum: PaymentMethod,
    example: PaymentMethod.CREDIT_CARD,
  })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({
    description: 'Status of the payment',
    enum: PaymentStatus,
    example: PaymentStatus.PENDING,
  })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @ApiPropertyOptional({
    description: 'Payment link ID for external payment systems',
    example: 'payment-link-123',
  })
  @IsOptional()
  @IsString()
  paymentLinkId?: string;

  @ApiPropertyOptional({
    description: 'Checkout URL for the payment',
    example: 'https://payment-provider.com/checkout/12345',
  })
  @IsOptional()
  @IsString()
  checkoutUrl?: string;

  @ApiPropertyOptional({
    description: 'QR code link for the payment',
    example: 'https://payment-provider.com/qrcode/12345',
  })
  @IsOptional()
  @IsString()
  qrCode?: string;

  @ApiPropertyOptional({
    description: 'Reason for cancellation, if applicable',
    example: 'User requested cancellation',
  })
  @IsOptional()
  @IsString()
  cancellationReason?: string;
}
