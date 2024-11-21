import { FeeType } from '@entities';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

class CourseFeeDto {
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

@Exclude()
export class CreateCourseDto {
  @ApiProperty({
    type: String,
    description: 'Name of the course',
    example: 'Introduction to Programming',
  })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Subject of the course',
    example: 'Computer Science',
  })
  @IsString()
  @Expose()
  subject: string;

  @ApiProperty({
    type: String,
    description: 'Duration of the course',
    example: '10 weeks',
  })
  @IsString()
  @Expose()
  duration: string;

  @ApiProperty({
    type: String,
    description: 'Description of the course',
    example: 'This course will introduce you to programming',
  })
  @IsString()
  @Expose()
  description?: string;

  @ApiProperty({
    type: String,
    description: 'Location ID of the course',
    example: '123e4567-e',
  })
  @IsUUID()
  @Expose()
  locationId: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        feeAmount: {
          type: 'number',
          example: 100.0,
        },
        feeType: {
          type: 'string',
          example: 'One-time',
        },
        description: {
          type: 'string',
          example: 'One-time payment for the course',
        },
      },
    },
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourseFeeDto)
  fees?: CourseFeeDto[];
}
