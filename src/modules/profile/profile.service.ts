import { EcommerceApiResponse } from '@decorators';
import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '@entities';
import { plainToClass } from 'class-transformer';
import { ProfileInfoDto } from './dto/profile-info.dto';
import { EcommerceNotFoundException } from '@exceptions';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}
  create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  findAll() {
    return `This action returns all profile`;
  }

  async findProfileByUserId(userId: string): Promise<ProfileInfoDto> {
    try {
      const profile = await this.profileRepository.findOne({
        where: { user: { id: userId } },
      });
      if (!profile) {
        throw new EcommerceNotFoundException('Profile not found');
      }
      return plainToClass(ProfileInfoDto, profile.id);
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
