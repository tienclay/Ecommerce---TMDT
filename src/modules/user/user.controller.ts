import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard, RolesGuard } from '@guards';
import { CurrentUser, EcommerceApiResponse, Roles } from '@decorators';
import { User } from '@entities';
import { EcommerceForbiddenException } from '@exceptions';
import { UserInfoDto } from './dto/user-info.dto';
import { UserRole } from '@enums';
import { ProfileId } from './dto/profile-id.dto';
import { CourseInfoDto } from '../course/dto/course-info.dto';
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
}
