import { EcommerceBadRequestException } from './../../common/infra-exception/exception';
import { connectionSource } from './../../../ormconfig';
import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, CourseTutor, Order, User } from '@entities';
import { DeepPartial, Repository, Connection, In } from 'typeorm';
import { CourseInfoDto } from './dto/course-info.dto';
import { plainToClass } from 'class-transformer';
import { EcommerceNotFoundException } from '@exceptions';
import { CourseTutorInfoDto } from './dto/course-tutor-info.dto';
import { UserRole } from '@enums';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(CourseTutor)
    private courseTutorRepository: Repository<CourseTutor>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly connection: Connection,
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
      await this.courseRepository.softRemove(course);
      return 'Course deleted';
    } catch (error) {
      throw new Error(`Failed to delete course: ${error.message}`);
    }
  }
  async assignTutorToCourse(
    courseId: string,
    assignTutorDto: string[],
  ): Promise<string> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Check if course exists
      const course = await this.courseRepository.findOne({
        where: { id: courseId },
      });
      if (!course) {
        throw new EcommerceNotFoundException('Course not found');
      }

      // Find all tutors in one query
      const tutors = await this.userRepository.find({
        where: { id: In(assignTutorDto), role: UserRole.TUTOR },
      });

      // Validate all tutors exist
      if (tutors.length !== assignTutorDto.length) {
        throw new EcommerceNotFoundException('One or more tutors not found');
      }

      // Check for existing relationships
      const existingRelations = await this.courseTutorRepository.find({
        where: {
          courseId,
          tutorId: In(assignTutorDto),
        },
      });

      // Filter out existing relationships
      const newTutorIds = assignTutorDto.filter(
        (tutorId) => !existingRelations.find((rel) => rel.tutorId === tutorId),
      );

      // Create new relationships in parallel
      await Promise.all(
        newTutorIds.map((tutorId) => {
          const courseTutorData: DeepPartial<CourseTutor> = {
            courseId,
            tutorId,
          };
          const courseTutor =
            this.courseTutorRepository.create(courseTutorData);
          return queryRunner.manager.save(courseTutor);
        }),
      );

      await queryRunner.commitTransaction();
      return `Successfully assigned ${newTutorIds.length} tutors to course`;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new EcommerceBadRequestException(
        `Failed to assign tutor to course: ${error.message}`,
      );
    } finally {
      await queryRunner.release();
    }
  }
}
