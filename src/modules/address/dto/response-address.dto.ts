import { ApiProperty } from '@nestjs/swagger';

export class ResponseAddressDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1, description: 'ID of the user' })
  userId: number;

  @ApiProperty({ example: 'Home', description: 'Title of the address' })
  title?: string;

  @ApiProperty({ example: '123 Main St', description: 'Address line 1' })
  addressLine1: string;

  @ApiProperty({ example: 'Apt 456', description: 'Address line 2 (if any)' })
  addressLine2?: string;

  @ApiProperty({ example: 'Vietnam', description: 'Country' })
  country: string;

  @ApiProperty({ example: 'Hanoi', description: 'City' })
  city: string;

  @ApiProperty({ example: '100000', description: 'Postal code' })
  postalCode: string;

  @ApiProperty({
    example: 'Near the big park',
    description: 'Landmark (if any)',
  })
  landmark?: string;

  @ApiProperty({ example: '0123456789', description: 'Phone number' })
  phoneNumber: string;
}
