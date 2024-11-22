import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, Order, User } from '@entities';
import { DeepPartial, Repository } from 'typeorm';
import { CourseInfoDto } from './dto/course-info.dto';
import { plainToClass } from 'class-transformer';
import { EcommerceNotFoundException } from '@exceptions';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}
  async create(createCourseDto: CreateCourseDto): Promise<CourseInfoDto> {
    try {
      // Create course with proper typing
      console.log('createCourseDto :>> ', createCourseDto);
      const course = this.courseRepository.create(createCourseDto);
      const saveCourse = await this.courseRepository.save(course);
      return plainToClass(CourseInfoDto, saveCourse);
    } catch (error) {
      throw new Error(`Failed to create course: ${error.message}`);
    }
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  async update(
    id: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<CourseInfoDto> {
    try {
      const course = await this.courseRepository.findOne({ where: { id } });
      if (!course) {
        throw new EcommerceNotFoundException('Course not found');
      }
      const updatedCourse = await this.courseRepository.save({
        ...course,
        ...updateCourseDto,
      });
      return plainToClass(CourseInfoDto, updatedCourse);
    } catch (error) {
      throw new Error(`Failed to update course: ${error.message}`);
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const course = await this.courseRepository.findOne({ where: { id } });
      if (!course) {
        throw new EcommerceNotFoundException('Course not found');
      }
      await this.courseRepository.remove(course);
      return 'Course deleted';
    } catch (error) {
      throw new Error(`Failed to delete course: ${error.message}`);
    }
  }
}
