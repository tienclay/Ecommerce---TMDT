import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendCreatePaymentDto {
  @ApiProperty({
    description: 'Order ID',
    example: '123',
  })
  @IsNumber()
  @IsNotEmpty()
  orderCode: number;

  @ApiProperty({
    description: 'Description',
    example: 'Order Payment #123',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Return URL',
    example: 'http://example.com/return',
  })
  @IsString()
  @IsNotEmpty()
  returnUrl: string;

  @ApiProperty({
    description: 'Cancel URL',
    example: 'http://example.com/cancel',
  })
  @IsString()
  @IsNotEmpty()
  cancelUrl: string;

  @ApiProperty({
    description: 'Amount',
    example: 100000,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
