import { IsString, IsOptional, IsEmail, IsEnum, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole, UserStatus } from '@enums';

export class CreateAuthDto {
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
    enum: UserRole,
    description: 'Role of the user',
    default: 'STUDENT',
  })
  @IsEnum(UserRole)
  @IsOptional()
  role: string = 'STUDENT';

  @IsEnum(UserStatus)
  status: UserStatus = UserStatus.ACTIVE;
}
