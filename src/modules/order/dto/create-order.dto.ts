// src/order/dto/create-order.dto.ts

import { OrderStatus } from '@entities';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID của sinh viên (User) đặt hàng',
    example: 'user-12345',
  })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({
    description: 'ID của khóa học',
    example: 'course-67890',
  })
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @ApiProperty({
    description: 'ID của phí khóa học',
    example: 'courseFee-54321',
  })
  @IsString()
  @IsNotEmpty()
  courseFeeId: string;

  @ApiProperty({
    description: 'Trạng thái của đơn hàng',
    enum: OrderStatus,
    example: OrderStatus.PENDING,
    required: false,
    default: OrderStatus.PENDING,
  })
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiProperty({
    description: 'Tổng số tiền của đơn hàng',
    example: 150.0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  totalAmount: number;
}
