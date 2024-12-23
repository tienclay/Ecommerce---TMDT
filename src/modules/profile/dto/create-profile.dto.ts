import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PhoneCode } from '@enums';
import { DegreeType } from '@entities';

export class CreateProfileDto {
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
  firstName?: string;

  @ApiProperty({
    type: String,
    description: 'Last name of the user',
    maxLength: 255,
    example: 'Tien',
  })
  @IsString()
  @Length(1, 255)
  lastName?: string;

  @ApiPropertyOptional({
    enum: DegreeType,
    description: 'Degree of the user',
  })
  degree?: DegreeType;

  @ApiPropertyOptional({
    type: Number,
    description: 'Years of experience of the user',
    example: 5,
  })
  experienceYears?: number;

  @ApiProperty({
    type: String,
    description: 'Biography of the user',
    example: 'I am a software engineer',
  })
  @IsString()
  bio?: string;

  @ApiProperty({
    type: String,
    description: 'Address of the user',
    example: '123 Street, City, Country',
  })
  @IsString()
  address?: string;

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
}
