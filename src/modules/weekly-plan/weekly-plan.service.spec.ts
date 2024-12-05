import { Test, TestingModule } from '@nestjs/testing';
import { WeeklyPlanService } from './weekly-plan.service';

describe('WeeklyPlanService', () => {
  let service: WeeklyPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeeklyPlanService],
    }).compile();

    service = module.get<WeeklyPlanService>(WeeklyPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
