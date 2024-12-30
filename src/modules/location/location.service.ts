import { plainToClass } from 'class-transformer';
import { Inject, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationInfoDto } from './dto/location-info.dto';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from '@entities';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}
  async create(createLocationDto: CreateLocationDto): Promise<LocationInfoDto> {
    try {
      const locationData: DeepPartial<Location> = {
        ...createLocationDto,
      };
      const location = await this.locationRepository.create(locationData);
      const saveLocation = await this.locationRepository.save(location);
      return plainToClass(LocationInfoDto, saveLocation);
    } catch (error) {
      throw new Error(`Failed to create location: ${error.message}`);
    }
  }

  async findAll() {
    const locations = await this.locationRepository.find();
    return locations;
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
