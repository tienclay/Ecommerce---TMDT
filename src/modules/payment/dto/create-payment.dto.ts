import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'Order ID',
    example: '123',
  })
  @IsString()
  @IsNotEmpty()
  orderId: string;

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
}
