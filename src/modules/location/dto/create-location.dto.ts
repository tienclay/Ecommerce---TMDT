import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({
    description: 'Address line 1',
    example: '123 Main St',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  addressLine1: string;

  @ApiProperty({
    description: 'Address line 2',
    example: 'Apt 101',
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  addressLine2?: string;

  @ApiProperty({
    description: 'City',
    example: 'San Francisco',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  city: string;

  @ApiProperty({
    description: 'State',
    example: 'CA',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  state: string;

  @ApiProperty({
    description: 'Zip code',
    example: '94101',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  zipCode: string;

  @ApiProperty({
    description: 'Country',
    example: 'United States',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  country: string;
}
