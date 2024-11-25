// src/course-fee/course-fee.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseFeeDto } from './dto/create-course-fee.dto';
import { UpdateCourseFeeDto } from './dto/update-course-fee.dto';
import { CourseFee } from '@entities';

@Injectable()
export class CourseFeeService {
  constructor(
    @InjectRepository(CourseFee)
    private readonly courseFeeRepository: Repository<CourseFee>,
  ) {}

  // Tạo phí khóa học mới
  async create(createCourseFeeDto: CreateCourseFeeDto): Promise<CourseFee> {
    const courseFee = this.courseFeeRepository.create(createCourseFeeDto);
    return this.courseFeeRepository.save(courseFee);
  }

  // Lấy tất cả phí khóa học
  async findAll(): Promise<CourseFee[]> {
    return this.courseFeeRepository.find({
      relations: ['course'],
    });
  }

  // Lấy phí khóa học theo ID
  async findOne(id: string): Promise<CourseFee> {
    const courseFee = await this.courseFeeRepository.findOne({
      where: { id },
      relations: ['course'],
    });
    if (!courseFee) {
      throw new NotFoundException(`CourseFee with ID ${id} not found`);
    }
    return courseFee;
  }

  // Cập nhật phí khóa học
  async update(
    id: string,
    updateCourseFeeDto: UpdateCourseFeeDto,
  ): Promise<CourseFee> {
    const courseFee = await this.findOne(id);
    Object.assign(courseFee, updateCourseFeeDto);
    return this.courseFeeRepository.save(courseFee);
  }

  // Xoá phí khóa học
  async remove(id: string): Promise<void> {
    const courseFee = await this.findOne(id);
    await this.courseFeeRepository.remove(courseFee);
  }
}
