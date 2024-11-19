// src/entities/user.entity.ts

import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Profile } from './profile.entity';
import { Status } from './status.entity';
import { Review } from './review.entity';
import { Payment } from './payment.entity';
import { Membership } from './membership.entity';
import { Schedule } from './schedule.entity';
import { Course } from './course.entity';
import { Order } from './order.entity';

export enum UserRole {
  TUTOR = 'TUTOR',
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  @Expose()
  username: string;

  @Column()
  @Exclude()
  password_hash: string;

  @Column({ unique: true })
  @Expose()
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  @Expose()
  role: UserRole;

  // One-to-One with Profile
  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    eager: true,
  })
  profile: Profile;

  // One-to-Many with Status
  @OneToMany(() => Status, (status) => status.user, {
    cascade: true,
  })
  statuses: Status[];

  // One-to-Many with Review (as reviewer)
  @OneToMany(() => Review, (review) => review.student, {
    cascade: true,
  })
  givenReviews: Review[];

  // One-to-Many with Review (as reviewed)
  @OneToMany(() => Review, (review) => review.tutor, {
    cascade: true,
  })
  receivedReviews: Review[];

  // One-to-Many with Payment
  @OneToMany(() => Payment, (payment) => payment.user, {
    cascade: true,
  })
  payments: Payment[];

  // One-to-Many with Membership
  @OneToMany(() => Membership, (membership) => membership.user, {
    cascade: true,
  })
  memberships: Membership[];

  // One-to-Many with Schedule
  @OneToMany(() => Schedule, (schedule) => schedule.user, {
    cascade: true,
  })
  schedules: Schedule[];

  // Many-to-Many with Course as Tutor
  @ManyToMany(() => Course, (course) => course.tutors)
  @JoinTable({
    name: 'course_tutors',
    joinColumn: { name: 'tutor_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'course_id', referencedColumnName: 'id' },
  })
  tutoringCourses: Course[];

  // Many-to-Many with Course as Student via Order
  @OneToMany(() => Order, (order) => order.student)
  orders: Order[];
}
