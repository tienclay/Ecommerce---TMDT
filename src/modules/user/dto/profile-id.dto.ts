import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ProfileId {
  @ApiProperty({
    type: String,
    description: 'Unique profile ID',
    example: '123e4567-e',
  })
  @IsUUID()
  id: string;
}
