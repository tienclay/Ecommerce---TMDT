import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWeeklyPlanDto {
  @ApiProperty({ example: 1, description: 'The week number for the plan' })
  @IsInt()
  weekNumber: number;

  @ApiProperty({
    example: 'Introduction to JavaScript',
    description: 'The topic of the weekly plan',
  })
  @IsString()
  @MaxLength(255)
  topic: string;

  @ApiProperty({
    example:
      'Learn the basics of JavaScript including variables, data types, etc.',
    description: 'A brief description of the weekly plan',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'b8f8f4d1-2d3d-4d1b-8c12-d7103e16f29e',
    description: 'Course ID related to this weekly plan',
  })
  @IsString()
  courseId: string;
}
