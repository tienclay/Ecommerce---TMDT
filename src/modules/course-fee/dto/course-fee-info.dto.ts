import { FeeType } from '@entities';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CourseFeeInfoDto {
  @ApiProperty({
    description: 'Course fee ID',
    example: '123e4567-e',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Fee amount',
    example: 100,
  })
  @Expose()
  feeAmount: number;

  @ApiProperty({
    description: 'Fee type',
    example: 'One-time',
  })
  @Expose()
  feeType: FeeType;

  @ApiProperty({
    description: 'Description',
    example: 'One-time fee for the course',
  })
  @Expose()
  description?: string;

  @ApiProperty({
    description: 'Course ID',
    example: '123e4567-e',
  })
  @Expose()
  courseId: string;
}
