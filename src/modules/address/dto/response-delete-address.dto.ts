import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResponseDeleteAddressDto {
  @ApiProperty({ example: 'Address deleted successfully' })
  @IsString()
  result: string;
}
