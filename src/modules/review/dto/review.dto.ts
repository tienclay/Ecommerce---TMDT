// src/review/dto/review.dto.ts

import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class ReviewDto {
  @Expose()
  id: string;

  @Expose()
  rating: number;

  @Expose()
  comment: string;

  @Expose()
  studentId: string;

  @Expose()
  tutorId: string;

  @Expose()
  courseId?: string;
}
