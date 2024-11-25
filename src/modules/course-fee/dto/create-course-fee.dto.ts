// src/course-fee/dto/create-course-fee.dto.ts

import { FeeType } from '@entities';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCourseFeeDto {
  @ApiProperty({
    description: 'Số tiền phí khóa học',
    example: 200.0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  feeAmount: number;

  @ApiProperty({
    description: 'Loại phí',
    enum: FeeType,
    example: FeeType.ONE_TIME,
    default: FeeType.ONE_TIME,
  })
  @IsEnum(FeeType)
  feeType: FeeType;

  @ApiPropertyOptional({
    description: 'Mô tả về phí khóa học',
    example: 'Phí đăng ký một lần cho khóa học lập trình nâng cao.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'ID của khóa học liên kết với phí này',
    example: 'course-67890',
  })
  @IsUUID()
  courseId: string;
}
