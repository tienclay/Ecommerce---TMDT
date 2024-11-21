import { Test, TestingModule } from '@nestjs/testing';
import { CourseFeeController } from './course-fee.controller';
import { CourseFeeService } from './course-fee.service';

describe('CourseFeeController', () => {
  let controller: CourseFeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseFeeController],
      providers: [CourseFeeService],
    }).compile();

    controller = module.get<CourseFeeController>(CourseFeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
