import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserOutputDto {
  @ApiProperty({
    type: String,
    description: 'Identity of the user',
  })
  @IsUUID()
  id: string;
}
