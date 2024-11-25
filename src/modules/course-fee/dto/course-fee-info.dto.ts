// src/course-fee/dto/course-fee.dto.ts

import { Course, FeeType } from '@entities';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CourseFeeDto {
  @ApiProperty({
    description: 'ID của phí khóa học',
    example: 'courseFee-12345',
  })
  id: string;

  @ApiProperty({
    description: 'Số tiền phí khóa học',
    example: 200.0,
  })
  feeAmount: number;

  @ApiProperty({
    description: 'Loại phí',
    enum: FeeType,
    example: FeeType.ONE_TIME,
  })
  feeType: FeeType;

  @ApiPropertyOptional({
    description: 'Mô tả về phí khóa học',
    example: 'Phí đăng ký một lần cho khóa học lập trình nâng cao.',
  })
  description?: string;

  @ApiProperty({
    description: 'ID của khóa học liên kết với phí này',
    example: 'course-67890',
  })
  courseId: string;

  @ApiProperty({
    description: 'Thông tin khóa học liên kết',
    type: () => Course,
    nullable: true,
  })
  course?: Course;

  @ApiProperty({
    description: 'Ngày tạo phí khóa học',
    example: '2024-04-01T10:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Ngày cập nhật phí khóa học',
    example: '2024-04-02T12:00:00Z',
  })
  updatedAt: Date;
}
