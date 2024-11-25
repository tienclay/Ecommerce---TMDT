// src/entities/order.entity.ts

import { Expose } from 'class-transformer';
import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Course } from './course.entity';
import { CourseFee } from './course-fee.entity';
import { Payment } from './payment.entity';

export enum OrderStatus {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

@Entity('orders')
export class Order extends BaseEntity {
  @Column()
  studentId: string;

  @Column()
  courseId: string;

  @Column()
  courseFeeId: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  @Expose()
  status: OrderStatus;

  @Column('decimal', { precision: 10, scale: 2 })
  @Expose()
  totalAmount: number;

  // Many-to-One with User (Student)
  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: User;

  // Many-to-One with Course
  @ManyToOne(() => Course, (course) => course.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  // Many-to-One with CourseFee
  @ManyToOne(() => CourseFee, (courseFee) => courseFee.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_fee_id' })
  courseFee: CourseFee;

  // One-to-One with Payment
  @OneToOne(() => Payment, (payment) => payment.order, {
    cascade: true,
  })
  payment: Payment;
}
