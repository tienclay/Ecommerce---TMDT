import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@guards';
import { ProfileInfoDto } from './dto/profile-info.dto';
import { CurrentUser } from '@decorators';
import { EcommerceForbiddenException } from '@exceptions';

@Controller('ecommerce/profiles')
@ApiTags('Profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  // @Put(:)
  // @UseGuards(AuthGuard)

  @Get(':userId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get profile by userId' })
  @ApiResponse({
    status: 200,
    description: 'Profile found',
    type: ProfileInfoDto,
  })
  findProfileByUserId(@Param('userId') userId: string, @CurrentUser() user) {
    if (user.id !== userId) {
      throw new EcommerceForbiddenException(
        'You are not allowed to access this resource',
      );
    }
    return this.profileService.findProfileByUserId(userId);
  }

  @Patch(':profileId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update profile by id' })
  @ApiResponse({
    status: 200,
    description: 'Profile updated',
    type: ProfileInfoDto,
  })
  async update(
    @Param('profileId') profileId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileInfoDto> {
    return this.profileService.update(profileId, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
