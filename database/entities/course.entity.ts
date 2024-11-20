// src/entities/course.entity.ts

import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  ManyToMany,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { CourseFee } from './course-fee.entity';
import { Location } from './location.entity';
import { Order } from './order.entity';

@Entity('courses')
export class Course extends BaseEntity {
  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  subject: string;

  @Column()
  @Expose()
  duration: string; // e.g., "10 weeks"

  @Column()
  locationId: string;

  @Column({ type: 'text', nullable: true })
  @Expose()
  description?: string;

  // Many-to-Many with User as Tutors
  @ManyToMany(() => User, (user) => user.tutoringCourses)
  tutors: User[];

  // One-to-Many with CourseFee
  @OneToMany(() => CourseFee, (courseFee) => courseFee.course, {
    cascade: true,
  })
  fees: CourseFee[];

  // Many-to-One with Location
  @ManyToOne(() => Location, (location) => location.courses, {})
  @JoinColumn({ name: 'location_id' })
  location: Location;

  // One-to-Many with Order
  @OneToMany(() => Order, (order) => order.course, {
    cascade: true,
  })
  orders: Order[];
}
