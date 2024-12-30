import {
  EcommerceBadRequestException,
  EcommerceNotAcceptableException,
} from '@exceptions';
import { plainToClass } from 'class-transformer';
import {
  Course,
  CourseTutor,
  Like,
  Order,
  OrderStatus,
  Payment,
  Profile,
  Review,
  Status,
  User,
} from '@entities';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserInfoDto } from './dto/user-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EcommerceNotFoundException } from '@exceptions';
import { ProfileId } from './dto/profile-id.dto';
import { UserRole, UserStatus } from '@enums';
import { CourseInfoDto } from '../course/dto/course-info.dto';
import { ReviewDto } from '../review/dto/review.dto';
import {
  CreateStatusDto,
  LikeStatusDto,
  StatusResponseDto,
} from './dto/status-like.dto';

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
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}
  private readonly logger = new Logger(UserService.name);
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
          where: { studentId: userId, status: OrderStatus.COMPLETED },
          relations: ['course'],
        });
        courses = orders.map((order) => order.course);
      } else if (user.role === UserRole.TUTOR) {
        // Get assigned courses for tutors
        const courseTutors = await this.courseTutorRepository.find({
          where: { tutorId: userId },
          relations: ['course'],
        });
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
  async getReviewsByUserId(userId: string): Promise<ReviewDto[]> {
    try {
      const user: User = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new EcommerceNotFoundException('User not found');
      }
      if (user.role == UserRole.ADMIN) {
        throw new EcommerceBadRequestException(
          'You are not allowed to access this resource',
        );
      }
      if (user.role == UserRole.STUDENT) {
        const reviews = await this.reviewRepository.find({
          where: { studentId: userId },
        });
        return reviews.map((review) => plainToClass(ReviewDto, review));
      }
      const reviews = await this.reviewRepository.find({
        where: { tutorId: userId },
      });
      return reviews.map((review) => plainToClass(ReviewDto, review));
    } catch (error) {
      this.logger.error(error);
      throw new EcommerceBadRequestException(
        `Failed to get reviews: ${error.message}`,
      );
    }
  }
  async createStatus(
    createStatusDto: CreateStatusDto,
  ): Promise<StatusResponseDto> {
    try {
      const status = this.statusRepository.create(createStatusDto);
      await this.statusRepository.save(status);
      await this.updateAncestorRepliesCounts(status.parentStatusId);
      return plainToClass(StatusResponseDto, status);
    } catch (error) {
      this.logger.error(error);
      throw new EcommerceBadRequestException(
        `Failed to create status: ${error.message}`,
      );
    }
  }

  async findAllStatusesByUser(userId: string): Promise<StatusResponseDto[]> {
    try {
      const statuses = await this.statusRepository.find({
        where: { userId: userId },
      });
      return statuses.map((status) => plainToClass(StatusResponseDto, status));
    } catch (error) {
      this.logger.error(error);
      throw new EcommerceBadRequestException(
        `Failed to get statuses: ${error.message}`,
      );
    }
  }

  private async updateAncestorRepliesCounts(
    statusId: string | null,
    delta: number = 1,
  ) {
    if (!statusId) {
      return;
    }

    try {
      const parentStatus = await this.statusRepository.findOne({
        where: { id: statusId },
        relations: ['parentStatus'],
      });

      if (parentStatus) {
        // Update current parent's count
        parentStatus.repliesCount += delta;
        await this.statusRepository.save(parentStatus);

        // Recursively update ancestor counts
        if (parentStatus.parentStatusId) {
          await this.updateAncestorRepliesCounts(parentStatus.parentStatusId);
        }
      }
    } catch (error) {
      throw new EcommerceNotAcceptableException(
        `Failed to update ancestor replies counts: ${error.message}`,
      );
    }
  }

  async likeStatus(likeStatusDto: LikeStatusDto): Promise<void> {
    try {
      const existingLike = await this.likeRepository.findOne({
        where: likeStatusDto,
      });
      if (existingLike) {
        throw new EcommerceBadRequestException('You have already liked this');
      }
      const like = this.likeRepository.create(likeStatusDto);
      await Promise.all([
        this.likeRepository.save(like),
        this.updateLikesCount(likeStatusDto.statusId),
      ]);
    } catch (error) {
      this.logger.error(error);
      throw new EcommerceBadRequestException(
        `Failed to like status: ${error.message}`,
      );
    }
  }

  async unlikeStatus(likeStatusDto: LikeStatusDto): Promise<void> {
    try {
      const existingLike = await this.likeRepository.findOne({
        where: likeStatusDto,
      });
      if (!existingLike) {
        throw new EcommerceBadRequestException('You have not liked this');
      }
      await Promise.all([
        this.likeRepository.remove(existingLike),
        this.updateLikesCountOnDelete(likeStatusDto.statusId),
      ]);
    } catch (error) {
      this.logger.error(error);
      throw new EcommerceBadRequestException(
        `Failed to unlike status: ${error.message}`,
      );
    }
  }

  async updateLikesCount(statusId: string) {
    const status = await this.statusRepository.findOne({
      where: { id: statusId },
    });
    if (status) {
      status.likesCount += 1;
      await this.statusRepository.save(status);
    }
  }
  async updateLikesCountOnDelete(statusId: string) {
    const status = await this.statusRepository.findOne({
      where: { id: statusId },
    });
    if (status) {
      status.likesCount -= 1;
      await this.statusRepository.save(status);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      //ignore password
      return this.userRepository.find({ select: ['id', 'email', 'role'] });
    } catch (error) {
      throw new EcommerceBadRequestException(error.message);
    }
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    try {
      return this.orderRepository.find({ where: { studentId: userId } });
    } catch (error) {
      throw new EcommerceBadRequestException(error.message);
    }
  }

  async getPaymentsByUserId(userId: string): Promise<Payment[]> {
    try {
      return this.paymentRepository.find({ where: { userId } });
    } catch (error) {
      throw new EcommerceBadRequestException(error.message);
    }
  }
}
