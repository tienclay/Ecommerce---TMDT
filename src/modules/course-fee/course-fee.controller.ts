// src/course-fee/course-fee.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CourseFeeService } from './course-fee.service';
import { CreateCourseFeeDto } from './dto/create-course-fee.dto';
import { UpdateCourseFeeDto } from './dto/update-course-fee.dto';
import { plainToClass } from 'class-transformer';
import { CourseFeeDto } from './dto/course-fee-info.dto';

@ApiTags('CourseFees')
@Controller('course-fees')
export class CourseFeeController {
  constructor(private readonly courseFeeService: CourseFeeService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo phí khóa học mới' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Phí khóa học được tạo thành công',
    type: CourseFeeDto,
  })
  async create(
    @Body() createCourseFeeDto: CreateCourseFeeDto,
  ): Promise<CourseFeeDto> {
    const courseFee = await this.courseFeeService.create(createCourseFeeDto);
    return plainToClass(CourseFeeDto, courseFee);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả phí khóa học' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách phí khóa học',
    type: [CourseFeeDto],
  })
  async findAll(): Promise<CourseFeeDto[]> {
    const courseFees = await this.courseFeeService.findAll();
    return courseFees.map((cf) => plainToClass(CourseFeeDto, cf));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy phí khóa học theo ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID của phí khóa học',
    example: 'courseFee-12345',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Thông tin phí khóa học',
    type: CourseFeeDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy phí khóa học',
  })
  async findOne(@Param('id') id: string): Promise<CourseFeeDto> {
    const courseFee = await this.courseFeeService.findOne(id);
    return plainToClass(CourseFeeDto, courseFee);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật phí khóa học theo ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID của phí khóa học',
    example: 'courseFee-12345',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Phí khóa học được cập nhật thành công',
    type: CourseFeeDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy phí khóa học',
  })
  async update(
    @Param('id') id: string,
    @Body() updateCourseFeeDto: UpdateCourseFeeDto,
  ): Promise<CourseFeeDto> {
    const updatedCourseFee = await this.courseFeeService.update(
      id,
      updateCourseFeeDto,
    );
    return plainToClass(CourseFeeDto, updatedCourseFee);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoá phí khóa học theo ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID của phí khóa học',
    example: 'courseFee-12345',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Phí khóa học được xoá thành công',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy phí khóa học',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.courseFeeService.remove(id);
  }
}
