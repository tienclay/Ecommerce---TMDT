import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CourseInfoDto } from 'src/modules/course/dto/course-info.dto';

@Exclude()
export class LocationInfoDto {
  @ApiProperty({
    description: 'Location ID',
    example: '123e4567-e',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Address line 1',
    example: '123 Main St',
  })
  @Expose()
  addressLine1: string;

  @ApiProperty({
    description: 'Address line 2',
    example: 'Apt 101',
  })
  @Expose()
  addressLine2?: string;

  @ApiProperty({
    description: 'City',
    example: 'San Francisco',
  })
  @Expose()
  city: string;

  @ApiProperty({
    description: 'State',
    example: 'CA',
  })
  @Expose()
  state: string;

  @ApiProperty({
    description: 'Zip code',
    example: '94101',
  })
  @Expose()
  zipCode: string;

  @ApiProperty({
    description: 'Country',
    example: 'United States',
  })
  @Expose()
  country: string;

  @ApiProperty({
    description: 'Courses',
    type: [CourseInfoDto],
  })
  @Expose()
  @Type(() => CourseInfoDto) // Chuyển đổi nếu trả về danh sách `Course`
  courses?: CourseInfoDto[];
}
