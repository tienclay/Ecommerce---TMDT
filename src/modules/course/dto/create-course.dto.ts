import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
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
  
  
}
