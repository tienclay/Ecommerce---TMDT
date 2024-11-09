import {
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  IsDateString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PhoneCode, UserStatus } from '@enums';

export class CreateAuthDto {
  @ApiPropertyOptional({ type: String, description: 'Avatar URL of the user' })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({
    type: String,
    description: 'First name of the user',
    maxLength: 255,
    example: 'Clay',
  })
  @IsString()
  @Length(1, 255)
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Last name of the user',
    maxLength: 255,
    example: 'Tien',
  })
  @IsString()
  @Length(1, 255)
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'Unique username',
    maxLength: 255,
    example: 'tienclay',
  })
  @IsString()
  @Length(1, 255)
  username: string;

  @ApiProperty({
    type: String,
    description: 'Unique email address',
    maxLength: 255,
    example: 'tienclay@gmail.com',
  })
  @IsEmail()
  @Length(1, 255)
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password for authentication',
    maxLength: 255,
  })
  @IsString()
  @Length(1, 255)
  password: string;

  @ApiPropertyOptional({
    enum: ['CLIENT', 'ADMIN'],
    description: 'Role of the user',
    default: 'CLIENT',
  })
  @IsEnum(['CLIENT', 'ADMIN'])
  @IsOptional()
  role: string = 'CLIENT';

  @ApiPropertyOptional({
    type: Date,
    description: 'Birthdate of the user',
    example: '1990-01-01',
  })
  @IsOptional()
  @IsDateString()
  birthOfDate?: Date;

  @ApiPropertyOptional({
    type: String,
    description: 'Phone number of the user',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  phoneNumber?: string;

  @ApiPropertyOptional({ enum: PhoneCode, description: 'Phone country code' })
  @IsEnum(PhoneCode)
  phoneCode?: PhoneCode;

  @ApiProperty({ enum: UserStatus, description: 'Current status of the user' })
  @IsEnum(UserStatus)
  status: UserStatus = UserStatus.ACTIVE;
}
