import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CourseTutorInfoDto {
  @ApiProperty({
    description: 'Course tutor ID',
    example: '123e4567-e',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Course ID',
    example: '123e4567-e',
  })
  @Expose()
  courseId: string;

  @ApiProperty({
    description: 'Tutor ID',
    example: '123e4567-e',
  })
  @Expose()
  tutorId: string;
}
