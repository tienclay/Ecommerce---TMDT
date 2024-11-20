// src/entities/course-fee.entity.ts

import { Expose } from 'class-transformer';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Course } from './course.entity';

export enum FeeType {
  ONE_TIME = 'One-time',
  RECURRING = 'Recurring',
}

@Entity('course_fees')
export class CourseFee extends BaseEntity {
  @Column('decimal', { precision: 10, scale: 2 })
  @Expose()
  feeAmount: number;

  @Column({
    type: 'enum',
    enum: FeeType,
    default: FeeType.ONE_TIME,
  })
  @Expose()
  feeType: FeeType;

  @Column({ type: 'text', nullable: true })
  @Expose()
  description?: string;

  @Column({ type: 'uuid' })
  courseId: string;

  // Many-to-One with Course
  @ManyToOne(() => Course, (course) => course.fees, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
