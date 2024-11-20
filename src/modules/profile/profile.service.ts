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
        where: { userId: userId },
      });
      if (!profile) {
        throw new EcommerceNotFoundException('Profile not found');
      }
      return plainToClass(ProfileInfoDto, profile);
    } catch (error) {
      throw error;
    }
  }

  async update(
    profileId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileInfoDto> {
    try {
      const profile = await this.profileRepository.findOne({
        where: { id: profileId },
      });
      if (!profile) {
        throw new EcommerceNotFoundException('Profile not found');
      }
      const updatedProfile = await this.profileRepository.save({
        ...profile,
        ...updateProfileDto,
      });
      return plainToClass(ProfileInfoDto, updatedProfile);
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
