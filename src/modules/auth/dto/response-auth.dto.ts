import { ApiProperty } from '@nestjs/swagger';

export class ResponseAuthDto {
  @ApiProperty({ example: 'Bearer ...' })
  accessToken: string;

  @ApiProperty({ example: 'Bearer ...' })
  refreshToken: string;
}
