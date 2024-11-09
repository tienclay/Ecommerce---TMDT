import { EcommerceBadRequestException } from './../../common/infra-exception/exception';
import { ResponseAddressDto } from './dto/response-address.dto';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '@entities';
import { Repository } from 'typeorm';
import { EcommerceNotFoundException, InternalServerError } from '@exceptions';
import { ResponseUpdateAddressDto } from './dto/response-update-address.dto';
import { ResponseDeleteAddressDto } from './dto/response-delete-address.dto';
import e from 'express';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}
  async create(userId: string, createAddressDto: CreateAddressDto) {
    try {
      const address = this.addressRepository.create({
        ...createAddressDto,
        userId,
      });
      await this.addressRepository.save(address);
      return address;
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: string): Promise<Address[]> {
    try {
      const addresses = await this.addressRepository.find({
        where: { userId },
      });
      return addresses;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  async update(
    id: string,
    userId: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<ResponseUpdateAddressDto> {
    try {
      const address = await this.addressRepository.findOneBy({
        id,
        userId,
      });
      if (!address) {
        throw new EcommerceNotFoundException('Address not found');
      }
      const updatedAddress = await this.addressRepository.update(
        id,
        updateAddressDto,
      );
      if (updatedAddress.affected > 0) {
        return plainToInstance(ResponseUpdateAddressDto, {
          result: 'Address updated',
        });
      } else {
        return plainToInstance(ResponseUpdateAddressDto, {
          result: 'Address not updated',
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async remove(addressId: string, userId: string) {
    try {
      const address = await this.addressRepository.findOneBy({
        id: addressId,
        userId,
      });
      if (!address) {
        throw new EcommerceNotFoundException('Address not found');
      }
      await this.addressRepository.delete(addressId);
    } catch (error) {
      throw error;
    }
  }
}
