import { Test, TestingModule } from '@nestjs/testing';
import { CourseFeeService } from './course-fee.service';

describe('CourseFeeService', () => {
  let service: CourseFeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseFeeService],
    }).compile();

    service = module.get<CourseFeeService>(CourseFeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
