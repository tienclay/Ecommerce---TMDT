// src/entities/user.entity.ts

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
import { UserRole, UserStatus } from '@enums';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @Column({ type: 'enum', enum: UserStatus })
  status: UserStatus;

  @Column({ type: 'text', nullable: true })
  refreshToken?: string;

  // One-to-One with Profile
  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
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
