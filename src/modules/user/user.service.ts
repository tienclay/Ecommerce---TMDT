import { EcommerceBadRequestException } from './../../common/infra-exception/exception';
import { plainToClass } from 'class-transformer';
import { Course, CourseTutor, Order, Profile, User } from '@entities';
import { Inject, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { UserInfoDto } from './dto/user-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EcommerceNotFoundException } from '@exceptions';
import { ProfileInfoDto } from '../profile/dto/profile-info.dto';
import { ProfileId } from './dto/profile-id.dto';
import { UserRole, UserStatus } from '@enums';
import { CourseInfoDto } from '../course/dto/course-info.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(CourseTutor)
    private courseTutorRepository: Repository<CourseTutor>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
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

  async getCoursesByUserId(userId: string): Promise<CourseInfoDto[]> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new EcommerceNotFoundException('User not found');
      }

      let courses: Course[] = [];

      if (user.role === UserRole.STUDENT) {
        // Get courses from orders for students
        const orders = await this.orderRepository.find({
          where: { studentId: userId },
          relations: ['course'],
        });
        courses = orders.map((order) => order.course);
      } else if (user.role === UserRole.TUTOR) {
        // Get assigned courses for tutors
        const courseTutors = await this.courseTutorRepository.find({
          where: { tutorId: userId },
          relations: ['course'],
        });
        console.log('courseTutors :>> ', courseTutors);
        courses = courseTutors.map((ct) => ct.course);
      }

      return courses.map((course) =>
        plainToClass(CourseInfoDto, course, { excludeExtraneousValues: true }),
      );
    } catch (error) {
      throw new EcommerceBadRequestException(
        `Failed to get courses: ${error.message}`,
      );
    }
  }
}
