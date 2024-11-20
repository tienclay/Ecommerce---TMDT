import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

@Exclude()
export class ProfileId {
  @ApiProperty({
    type: String,
    description: 'Unique profile ID',
    example: '123e4567-e',
  })
  @IsUUID()
  @Expose()
  id: string;
}
