import { Expose } from 'class-transformer';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Course } from './course.entity'; // Import Course Entity

@Entity('reviews')
export class Review extends BaseEntity {
  @Column({ type: 'uuid' })
  studentId: string;

  @Column({ nullable: true, type: 'uuid' })
  tutorId?: string;

  @Column('int')
  @Expose()
  rating: number;

  @Column({ type: 'text', nullable: true })
  @Expose()
  comment?: string;

  @Column({ type: 'uuid', nullable: true })
  @Expose()
  courseId?: string; // Add courseId

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

  // Many-to-One with Course
  @ManyToOne(() => Course, (course) => course.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: Course; // Establish relationship with the Course entity
}
