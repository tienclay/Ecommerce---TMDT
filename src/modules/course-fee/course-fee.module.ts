import { Module } from '@nestjs/common';
import { CourseFeeService } from './course-fee.service';
import { CourseFeeController } from './course-fee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course, CourseFee } from '@entities';

@Module({
  imports: [TypeOrmModule.forFeature([CourseFee, Course])],
  controllers: [CourseFeeController],
  providers: [CourseFeeService],
})
export class CourseFeeModule {}
