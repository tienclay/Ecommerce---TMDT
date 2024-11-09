import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResponseUpdateAddressDto {
  @ApiProperty({ example: 'Address updated successfully' })
  @IsString()
  result: string;
}
