import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser, EcommerceApiResponse, Roles } from '@decorators';
import { AuthGuard } from '@guards';
import { UserRole } from '@enums';
import { Address } from '@entities';
import { ResponseUpdateAddressDto } from './dto/response-update-address.dto.js';
import { ResponseDeleteAddressDto } from './dto/response-delete-address.dto.js';

@ApiTags('address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Address created' })
  @HttpCode(HttpStatus.CREATED)
  @EcommerceApiResponse(Address)
  create(@Body() createAddressDto: CreateAddressDto, @CurrentUser() user) {
    return this.addressService.create(user.id, createAddressDto);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Return all address' })
  @HttpCode(HttpStatus.OK)
  @EcommerceApiResponse(Address, true)
  findAll(@CurrentUser() user): Promise<Address[]> {
    return this.addressService.findAll(user.id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Address updated' })
  @EcommerceApiResponse(ResponseUpdateAddressDto)
  update(
    @Param('id') addressId: string,
    @CurrentUser() user,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<ResponseUpdateAddressDto> {
    return this.addressService.update(addressId, user.id, updateAddressDto);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 204, description: 'Address deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') addressId: string, @CurrentUser() user) {
    return this.addressService.remove(addressId, user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }
}
