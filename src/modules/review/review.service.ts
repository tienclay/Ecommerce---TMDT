import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from '@entities';
import { ReviewDto } from './dto/review.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}
  private readonly logger = new Logger(ReviewService.name);

  async create(createReviewDto: CreateReviewDto): Promise<ReviewDto> {
    try {
      const review = this.reviewRepository.create(createReviewDto);
      const reviewRecord = await this.reviewRepository.save(review);
      return plainToClass(ReviewDto, reviewRecord);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
