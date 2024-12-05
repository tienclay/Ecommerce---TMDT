import { Module } from '@nestjs/common';
import { WeeklyPlanService } from './weekly-plan.service';
import { WeeklyPlanController } from './weekly-plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeeklyPlan } from '@entities';

@Module({
  imports: [TypeOrmModule.forFeature([WeeklyPlan])],
  controllers: [WeeklyPlanController],
  providers: [WeeklyPlanService],
})
export class WeeklyPlanModule {}
