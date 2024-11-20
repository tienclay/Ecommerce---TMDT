// src/entities/review.entity.ts

import { Expose } from 'class-transformer';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('reviews')
export class Review extends BaseEntity {
  @Column()
  studentId: string;

  @Column()
  tutorId: string;

  @Column('int')
  @Expose()
  rating: number;

  @Column({ type: 'text', nullable: true })
  @Expose()
  comment?: string;

  // Many-to-One with User (Student)
  @ManyToOne(() => User, (user) => user.givenReviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: User;

  // Many-to-One with User (Tutor)
  @ManyToOne(() => User, (user) => user.receivedReviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tutor_id' })
  tutor: User;
}
