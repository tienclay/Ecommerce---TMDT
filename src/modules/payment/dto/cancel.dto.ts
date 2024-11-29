import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CancelPaymentDto {
  @ApiProperty({
    description: 'Lý do hủy giao dịch',
    example: 'Khách hàng yêu cầu hủy',
  })
  @IsString()
  @IsNotEmpty()
  cancellationReason: string;
}
