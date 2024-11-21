import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, Order, User } from '@entities';
import { DeepPartial, Repository } from 'typeorm';
import { CourseInfoDto } from './dto/course-info.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}
  async create(createCourseDto: CreateCourseDto): Promise<CourseInfoDto> {
    try {
      // Create course with proper typing
      const courseData: DeepPartial<Course> = {
        name: createCourseDto.name,
        subject: createCourseDto.subject,
        duration: createCourseDto.duration,
        description: createCourseDto.description,
        locationId: createCourseDto.locationId,
        fees: createCourseDto.fees?.map((fee) => ({
          feeAmount: fee.feeAmount,
          feeType: fee.feeType,
          description: fee.description,
        })),
      };

      const course = this.courseRepository.create(courseData);
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

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
