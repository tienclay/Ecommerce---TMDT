// src/entities/course.entity.ts

import { Expose } from 'class-transformer';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CourseFee } from './course-fee.entity';
import { Location } from './location.entity';
import { Order } from './order.entity';
import { CourseTutor } from './course-tutor.entity';
import { Review } from '@entities';

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

  @Column({ type: 'uuid' })
  locationId: string;

  @Column({ type: 'text', nullable: true })
  @Expose()
  description?: string;

  @OneToMany(() => CourseTutor, (courseTutor) => courseTutor.course, {
    cascade: true,
  })
  tutors: CourseTutor[];

  // One-to-Many with CourseFee
  @OneToMany(() => CourseFee, (courseFee) => courseFee.course, {
    cascade: true,
  })
  fees: CourseFee[];

  // Many-to-One with Location
  @ManyToOne(() => Location, (location) => location.courses)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  // One-to-Many with Order
  @OneToMany(() => Order, (order) => order.course, {
    cascade: true,
  })
  orders: Order[];

  @OneToMany(() => Review, (review) => review.course)
  reviews: Review[]; // Add One-to-Many relationship with Review
}
