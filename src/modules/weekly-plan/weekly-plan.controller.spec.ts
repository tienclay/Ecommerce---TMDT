import { Test, TestingModule } from '@nestjs/testing';
import { WeeklyPlanController } from './weekly-plan.controller';
import { WeeklyPlanService } from './weekly-plan.service';

describe('WeeklyPlanController', () => {
  let controller: WeeklyPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeeklyPlanController],
      providers: [WeeklyPlanService],
    }).compile();

    controller = module.get<WeeklyPlanController>(WeeklyPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
