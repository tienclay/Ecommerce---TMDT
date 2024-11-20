import { plainToClass } from 'class-transformer';
import { Profile, User } from '@entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserInfoDto } from './dto/user-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EcommerceNotFoundException } from '@exceptions';
import { ProfileInfoDto } from '../profile/dto/profile-info.dto';
import { ProfileId } from './dto/profile-id.dto';
import { UserStatus } from '@enums';

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

  async findProfileId(userId: string): Promise<ProfileId> {
    try {
      const profile = await this.profileRepository.findOne({
        where: { userId: userId },
      });
      if (!profile) {
        throw new EcommerceNotFoundException('Profile not found');
      }
      return plainToClass(ProfileId, { id: profile.id });
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
      user.status = UserStatus.INACTIVE;
      await this.userRepository.save(user);
      return 'User deleted';
    } catch (error) {
      throw error;
    }
  }
}
