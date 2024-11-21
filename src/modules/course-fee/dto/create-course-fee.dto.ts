// src/courses/dto/create-course-fee.dto.ts

import { FeeType } from '@entities';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateCourseFeeDto {
  @IsNumber(
    {},
    {
      message: 'feeAmount must be a number',
    },
  )
  @Min(0, { message: 'feeAmount cannot be less than 0' })
  @Max(100000000, { message: 'feeAmount exceeds the allowed limit' })
  feeAmount: number;

  @IsEnum(FeeType, {
    message: `feeType must be one of the following values: ${Object.values(
      FeeType,
    ).join(', ')}`,
  })
  feeType: FeeType;

  @IsOptional()
  @IsString({
    message: 'description must be a string',
  })
  description?: string;
}
