import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  studentId?: string;

  @ApiProperty({
    description: 'ID of the tutor who is being reviewed',
    example: 'uuid',
  })
  @IsUUID()
  @IsOptional()
  tutorId?: string;

  @ApiProperty({ description: 'Rating given to the tutor (1-5)', example: 4 })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    description: 'Comment for the review',
    example: 'Great course!',
    required: false,
  })
  @IsOptional()
  comment?: string;

  @ApiProperty({
    description: 'ID of the course related to the review',
    example: 'uuid',
  })
  @IsUUID()
  @IsOptional()
  courseId?: string;
}
