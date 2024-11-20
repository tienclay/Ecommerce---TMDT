import { plainToClass } from 'class-transformer';
import { Profile, User } from '@entities';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserInfoDto } from './dto/user-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EcommerceNotFoundException } from '@exceptions';
import { ProfileInfoDto } from '../profile/dto/profile-info.dto';
import { applyRelations } from 'typeorm-extension';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}
  async findUserById(userId: string): Promise<UserInfoDto> {
    try {
      const user = await this.userRepository.findOneByOrFail({ id: userId });
      const { password, ...userInfo } = user;
      return plainToClass(UserInfoDto, userInfo, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new EcommerceNotFoundException('User not found');
    }
  }

  async findProfileId(userId: string): Promise<ProfileInfoDto> {
    try {
      const profile = await this.profileRepository.findOne({
        where: { user: { id: userId } },
      });
      if (!profile) {
        throw new EcommerceNotFoundException('Profile not found');
      }
      return plainToClass(ProfileInfoDto, profile);
    } catch (error) {
      throw error;
    }
  }

  async deleteUserById(userId: string): Promise<string> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new EcommerceNotFoundException('User not found');
      }

      await this.userRepository.delete({ id: userId });
      return 'User deleted';
    } catch (error) {
      throw error;
    }
  }
}
