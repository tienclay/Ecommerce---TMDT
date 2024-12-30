import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { Review, User } from '@entities';
import { ReviewDto } from './dto/review.dto';
import { AuthGuard, RolesGuard } from '@guards';
import { CurrentUser, Roles } from '@decorators';
import { UserRole } from '@enums';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Create a review for a tutor and course' })
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @Roles(UserRole.STUDENT)
  @ApiResponse({
    status: 201,
    description: 'Review created successfully',
    type: ReviewDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() user: User,
  ): Promise<ReviewDto> {
    createReviewDto.studentId = user.id;
    return this.reviewService.create(createReviewDto);
  }
}
