import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { LocationInfoDto } from 'src/modules/location/dto/location-info.dto';
import { UserInfoDto } from 'src/modules/user/dto/user-info.dto';
import { CourseFeeDto } from 'src/modules/course-fee/dto/course-fee-info.dto';

export class CourseInfoDto {
  @ApiProperty({
    description: 'Course ID',
    example: '123e4567-e',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Course name',
    example: 'Introduction to Programming',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Subject',
    example: 'Programming',
  })
  @Expose()
  subject: string;

  @ApiProperty({
    description: 'Duration',
    example: '10 weeks',
  })
  @Expose()
  duration: string;

  @ApiProperty({
    description: 'Description',
    example: 'Learn the basics of programming',
  })
  @Expose()
  description?: string;

  @ApiProperty({
    description: 'Location ID',
    example: '123e4567-e',
  })
  @Expose()
  locationId: string;

  @ApiProperty({
    description: 'Location',
    example: 'LocationInfoDto',
  })
  @Expose()
  @Type(() => LocationInfoDto) // Chuyển đổi Location sang DTO tương ứng
  location?: LocationInfoDto;

  @ApiProperty({
    description: 'Tutors',
    type: [UserInfoDto],
  })
  @Expose()
  @Type(() => UserInfoDto) // Chuyển đổi danh sách Tutors sang DTO
  tutors?: UserInfoDto[];

  @ApiProperty({
    description: 'Fees',
    type: [CourseInfoDto],
  })
  @Expose()
  @Type(() => CourseFeeDto) // Chuyển đổi danh sách CourseFee sang DTO
  fees?: CourseFeeDto[];
}
