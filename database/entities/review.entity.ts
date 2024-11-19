// src/entities/review.entity.ts

import { Expose } from 'class-transformer';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('reviews')
export class Review extends BaseEntity {
  @Column()
  student_id: string;

  @Column()
  tutor_id: string;

  @Column('int')
  @Expose()
  rating: number;

  @Column({ type: 'text', nullable: true })
  @Expose()
  comment?: string;

  // Many-to-One with User (Student)
  @ManyToOne(() => User, (user) => user.givenReviews, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'student_id' })
  student: User;

  // Many-to-One with User (Tutor)
  @ManyToOne(() => User, (user) => user.receivedReviews, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'tutor_id' })
  tutor: User;
}
