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

@Controller('profiles')
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
  findProfileByUserId(@Param('profileId') userId: string, @CurrentUser() user) {
    if (user.id !== userId) {
      throw new EcommerceForbiddenException(
        'You are not allowed to access this resource',
      );
    }
    return this.profileService.findProfileByUserId(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
