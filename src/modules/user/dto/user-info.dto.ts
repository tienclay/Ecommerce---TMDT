import { IsString, IsOptional, IsEmail, IsEnum, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole, UserStatus } from '@enums';
import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class UserInfoDto {
  @ApiProperty({
    type: String,
    description: 'Unique username',
    maxLength: 255,
    example: 'tienclay',
  })
  @IsString()
  @Length(1, 255)
  @Expose()
  username: string;

  @ApiProperty({
    type: String,
    description: 'Unique email address',
    maxLength: 255,
    example: 'tienclay@gmail.com',
  })
  @IsEmail()
  @Length(1, 255)
  @Expose()
  email: string;

  @ApiPropertyOptional({
    enum: UserRole,
    description: 'Role of the user',
    default: 'STUDENT',
  })
  @IsEnum(UserRole)
  @IsOptional()
  @Expose()
  role: string = 'STUDENT';

  @ApiPropertyOptional({
    enum: UserStatus,
    description: 'Status of the user',
    example: 'ACTIVE',
  })
  @IsEnum(UserStatus)
  @Expose()
  status: UserStatus = UserStatus.ACTIVE;
}
