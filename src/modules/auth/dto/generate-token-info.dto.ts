import { IsEmail, Length, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GenerateTokenInfoDto {
  @ApiProperty({
    type: String,
    description: 'Identity of the user',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    type: String,
    description: 'Unique email address',
    maxLength: 255,
  })
  @IsEmail()
  @Length(1, 255)
  email: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Expired time of the token',
  })
  expiredIn?: string;
}
