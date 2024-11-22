import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Course name',
    example: 'Introduction to Programming',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Subject',
    example: 'Programming',
  })
  @IsString()
  subject: string;

  @ApiProperty({
    description: 'Duration',
    example: '10 weeks',
  })
  @IsString()
  duration: string;

  @ApiProperty({
    description: 'Description',
    example: 'Learn the basics of programming',
  })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Location ID',
    example: '123e4567-e',
  })
  @IsUUID()
  locationId: string;
}
