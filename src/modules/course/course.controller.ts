import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@decorators';
import { UserRole } from '@enums';
import { AuthGuard, RolesGuard } from '@guards';
import { CourseInfoDto } from './dto/course-info.dto';

@Controller('ecommerce/courses')
@ApiTags('Course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @Roles(UserRole.TUTOR, UserRole.ADMIN)
  @ApiResponse({
    status: 201,
    description: 'Course created',
    type: CourseInfoDto,
  })
  async create(
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<CourseInfoDto> {
    console.log('createCourseDto :>> ', createCourseDto);
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':courseId')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @Roles(UserRole.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'Course updated',
    type: UpdateCourseDto,
  })
  async update(
    @Param('courseId') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<CourseInfoDto> {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':courseId')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @Roles(UserRole.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'Course deleted',
  })
  async remove(@Param('courseId') id: string): Promise<string> {
    return this.courseService.remove(id);
  }

  @Post(':courseId/assign-tutor/')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @Roles(UserRole.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'Tutor assigned to course',
  })
  async assignTutorToCourse(
    @Param('courseId') courseId: string,
    @Body() assignTutorDto: string[],
  ): Promise<string> {
    return this.courseService.assignTutorToCourse(courseId, assignTutorDto);
  }
}
