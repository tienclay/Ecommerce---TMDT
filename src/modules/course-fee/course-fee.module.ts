import { Module } from '@nestjs/common';
import { CourseFeeService } from './course-fee.service';
import { CourseFeeController } from './course-fee.controller';

@Module({
  controllers: [CourseFeeController],
  providers: [CourseFeeService],
})
export class CourseFeeModule {}
