import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course, CourseTutor, User } from '@entities';

@Module({
  imports: [TypeOrmModule.forFeature([Course, User, CourseTutor])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
