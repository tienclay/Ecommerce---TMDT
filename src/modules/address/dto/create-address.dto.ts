import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Length,
} from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    example: 'Home',
    description: 'Title of the address',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: '123 Main St',
    description: 'First line of the address',
  })
  @IsNotEmpty()
  @IsString()
  addressLine1: string;

  @ApiProperty({
    example: 'Apt 4B',
    description: 'Second line of the address',
    required: false,
  })
  @IsOptional()
  @IsString()
  addressLine2?: string;

  @ApiProperty({ example: 'US', description: 'Country of the address' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ example: 'New York', description: 'City of the address' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ example: '10001', description: 'Postal code of the address' })
  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @ApiProperty({
    example: 'Near Central Park',
    description: 'Landmark for the address',
    required: false,
  })
  @IsOptional()
  @IsString()
  landmark?: string;

  @ApiProperty({
    example: '01234567890',
    description: 'Phone number associated with the address',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  phoneNumber: string;
}
