// src/order/dto/order.dto.ts

import { Course, CourseFee, OrderStatus, Payment, User } from '@entities';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty({
    description: 'ID của đơn hàng',
    example: 'order-12345',
  })
  id: string;

  @ApiProperty({
    description: 'ID của sinh viên (User) đặt hàng',
    example: 'user-12345',
  })
  studentId: string;

  @ApiProperty({
    description: 'ID của khóa học',
    example: 'course-67890',
  })
  courseId: string;

  @ApiProperty({
    description: 'ID của phí khóa học',
    example: 'courseFee-54321',
  })
  courseFeeId: string;

  @ApiProperty({
    description: 'Trạng thái của đơn hàng',
    enum: OrderStatus,
    example: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @ApiProperty({
    description: 'Tổng số tiền của đơn hàng',
    example: 150.0,
  })
  totalAmount: number;

  @ApiProperty({
    description: 'Thông tin sinh viên (User)',
    type: () => User,
    nullable: true,
  })
  student?: User;

  @ApiProperty({
    description: 'Thông tin khóa học',
    type: () => Course,
    nullable: true,
  })
  course?: Course;

  @ApiProperty({
    description: 'Thông tin phí khóa học',
    type: () => CourseFee,
    nullable: true,
  })
  courseFee?: CourseFee;

  @ApiPropertyOptional({
    description: 'Thông tin thanh toán',
    type: () => Payment,
    nullable: true,
  })
  payment?: Payment;

  @ApiProperty({
    description: 'Ngày tạo đơn hàng',
    example: '2024-04-01T10:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Ngày cập nhật đơn hàng',
    example: '2024-04-02T12:00:00Z',
  })
  updatedAt: Date;
}
