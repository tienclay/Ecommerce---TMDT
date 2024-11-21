import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserInfoDto } from 'src/modules/user/dto/user-info.dto';

export class ScheduleInfoDto {
  @ApiProperty({
    description: 'Schedule ID',
    example: '123e4567-e',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e',
  })
  @Expose()
  userId: string;

  @ApiProperty({
    description: 'User',
    example: 'UserInfoDto',
  })
  @Expose()
  @Type(() => UserInfoDto) // Chuyển đổi User sang DTO tương ứng
  user?: UserInfoDto;

  @ApiProperty({
    description: 'Available from',
    example: '2021-07-01T00:00:00.000Z',
  })
  @Expose()
  availableFrom: Date;

  @ApiProperty({
    description: 'Available to',
    example: '2021-07-01T00:00:00.000Z',
  })
  @Expose()
  availableTo: Date;

  @ApiProperty({
    description: 'Location ID',
    example: '123e4567-e',
  })
  @Expose()
  locationId?: string;
}
