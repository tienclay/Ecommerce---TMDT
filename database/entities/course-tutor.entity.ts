// src/entities/course-tutor.entity.ts

import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';
import { User } from './user.entity';

@Entity('course_tutors')
export class CourseTutor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Course, (course) => course.tutors, {
    onDelete: 'CASCADE',
  })
  course: Course;

  @ManyToOne(() => User, (user) => user.tutoringCourses, {
    onDelete: 'CASCADE',
  })
  tutor: User;
}
