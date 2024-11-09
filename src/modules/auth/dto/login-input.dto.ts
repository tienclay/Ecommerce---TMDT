import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    description: 'Unique email address',
    maxLength: 255,
    example: 'tadinhtien@gmail.com',
  })
  @IsEmail()
  @Length(1, 255)
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password for authentication',
    maxLength: 255,
    example: 'clay',
  })
  @IsString()
  @Length(1, 255)
  password: string;
}
