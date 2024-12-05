import {
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  IsDateString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PhoneCode } from '@enums';
import { Exclude, Expose } from 'class-transformer';
import { DegreeType } from '@entities';

@Exclude()
export class ProfileInfoDto {
  @ApiPropertyOptional({ type: String, description: 'Avatar URL of the user' })
  @IsOptional()
  @IsString()
  @Expose()
  avatar?: string;

  @ApiProperty({
    type: String,
    description: 'First name of the user',
    maxLength: 255,
    example: 'Clay',
  })
  @IsString()
  @Length(1, 255)
  @Expose()
  firstName?: string;

  @ApiProperty({
    type: String,
    description: 'Last name of the user',
    maxLength: 255,
    example: 'Tien',
  })
  @IsString()
  @Length(1, 255)
  @Expose()
  lastName?: string;

  @ApiPropertyOptional({
    enum: DegreeType,
    description: 'Degree of the user',
  })
  @IsOptional()
  @IsString()
  @Expose()
  degree?: DegreeType;

  @ApiPropertyOptional({
    type: Number,
    description: 'Years of experience of the user',
    example: 5,
  })
  @IsOptional()
  @Expose()
  experienceYears?: number;

  @ApiProperty({
    type: String,
    description: 'Biography of the user',
    example: 'I am a software engineer',
  })
  @IsString()
  @Expose()
  bio?: string;

  @ApiProperty({
    type: String,
    description: 'Address of the user',
    example: '123 Street, City, Country',
  })
  @IsEmail()
  @Expose()
  address?: string;

  @ApiPropertyOptional({
    type: Date,
    description: 'Birthdate of the user',
    example: '1990-01-01',
  })
  @IsOptional()
  @IsDateString()
  @Expose()
  birthOfDate?: Date;

  @ApiPropertyOptional({
    type: String,
    description: 'Phone number of the user',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  @Expose()
  phoneNumber?: string;

  @ApiPropertyOptional({ enum: PhoneCode, description: 'Phone country code' })
  @IsEnum(PhoneCode)
  @Expose()
  phoneCode?: PhoneCode;
}
