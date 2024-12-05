import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard, RolesGuard } from '@guards';
import { CurrentUser, EcommerceApiResponse, Roles } from '@decorators';
import { Order, Payment, User } from '@entities';
import { EcommerceForbiddenException } from '@exceptions';
import { UserInfoDto } from './dto/user-info.dto';
import { UserRole } from '@enums';
import { ProfileId } from './dto/profile-id.dto';
import { CourseInfoDto } from '../course/dto/course-info.dto';
import { ReviewDto } from '../review/dto/review.dto';
import {
  CreateStatusDto,
  LikeStatusDto,
  StatusResponseDto,
} from './dto/status-like.dto';
import { OrderDto } from '../order/dto/order.dto';
@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':userId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: UserInfoDto,
  })
  async findUserById(
    @Param('userId') userId: string,
    @CurrentUser() user: User,
  ): Promise<UserInfoDto> {
    if (user.role !== 'ADMIN' && user.id !== userId) {
      throw new EcommerceForbiddenException(
        'You are not allowed to access this resource',
      );
    }
    return this.userService.findUserById(userId);
  }

  @Get(':userId/profileId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get ProfileId' })
  @ApiResponse({
    status: 200,
    description: 'ProfileId found',
    type: ProfileId,
  })
  async findProfileId(
    @Param('userId') userId: string,
    @CurrentUser() user: User,
  ): Promise<ProfileId> {
    if (user.role !== 'ADMIN' && user.id !== userId) {
      throw new EcommerceForbiddenException(
        'You are not allowed to access this resource',
      );
    }
    return this.userService.findProfileId(userId);
  }

  @Delete(':userId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({
    status: 200,
    description: 'User deleted',
  })
  async deleteUserById(@Param('userId') userId: string): Promise<string> {
    return this.userService.deleteUserById(userId);
  }

  @Get(':userId/courses')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get courses by user id' })
  @EcommerceApiResponse(CourseInfoDto, true)
  async getCoursesByUserId(
    @Param('userId') userId: string,
    @CurrentUser() user: User,
  ): Promise<CourseInfoDto[]> {
    if (user.role !== 'ADMIN' && user.id !== userId) {
      throw new EcommerceForbiddenException(
        'You are not allowed to access this resource',
      );
    }
    return this.userService.getCoursesByUserId(userId);
  }

  @Get(':userId/reviews')
  @ApiOperation({ summary: 'Get reviews by user id' })
  @EcommerceApiResponse(ReviewDto, true)
  async getReviewsByUserId(
    @Param('userId') userId: string,
  ): Promise<ReviewDto[]> {
    return this.userService.getReviewsByUserId(userId);
  }

  @Post('status')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new status' })
  createStatus(
    @Body() createStatusDto: CreateStatusDto,
    @CurrentUser() user: User,
  ): Promise<StatusResponseDto> {
    createStatusDto.userId = user.id;
    return this.userService.createStatus(createStatusDto);
  }

  @Get(':userId/statuses')
  @ApiOperation({ summary: 'Get statuses of a user' })
  findAllStatusesByUser(
    @Param('userId') userId: string,
  ): Promise<StatusResponseDto[]> {
    return this.userService.findAllStatusesByUser(userId);
  }

  @Post('likes/:statusId')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Like a status' })
  likeStatus(
    @Param('statusId') statusId: string,
    @CurrentUser() user: User,
  ): Promise<void> {
    const likeStatusDto: LikeStatusDto = {
      statusId,
      userId: user.id,
    };
    return this.userService.likeStatus(likeStatusDto);
  }
  @Post('unlikes/:statusId')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Unlike a status' })
  unlikeStatus(
    @Param('statusId') statusId: string,
    @CurrentUser() user: User,
  ): Promise<void> {
    const likeStatusDto: LikeStatusDto = {
      statusId,
      userId: user.id,
    };
    return this.userService.unlikeStatus(likeStatusDto);
  }

  //get all users
  @Get()
  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [UserInfoDto],
  })
  async findAll(): Promise<UserInfoDto[]> {
    return this.userService.findAll();
  }

  //get all orders
  @Get(':userId/orders')
  @ApiOperation({ summary: 'Get orders by user id' })
  @EcommerceApiResponse(Order, true)
  async getOrdersByUserId(@Param('userId') userId: string): Promise<Order[]> {
    return this.userService.getOrdersByUserId(userId);
  }

  //get all payments
  @Get(':userId/payments')
  @ApiOperation({ summary: 'Get payments by user id' })
  @EcommerceApiResponse(Payment, true)
  async getPaymentsByUserId(
    @Param('userId') userId: string,
  ): Promise<Payment[]> {
    return this.userService.getPaymentsByUserId(userId);
  }
}
