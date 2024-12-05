import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWeeklyPlanDto } from './dto/create-weekly-plan.dto';
import { UpdateWeeklyPlanDto } from './dto/update-weekly-plan.dto';
import { WeeklyPlan } from '@entities';
import { EcommerceBadRequestException } from '@exceptions';

@Injectable()
export class WeeklyPlanService {
  constructor(
    @InjectRepository(WeeklyPlan)
    private readonly weeklyPlanRepository: Repository<WeeklyPlan>,
  ) {}

  // Create a new weekly plan
  async create(createWeeklyPlanDto: CreateWeeklyPlanDto): Promise<WeeklyPlan> {
    try {
      const weeklyPlan = this.weeklyPlanRepository.create(createWeeklyPlanDto);
      return this.weeklyPlanRepository.save(weeklyPlan);
    } catch (error) {
      throw new EcommerceBadRequestException(error.message);
    }
  }

  // Get all weekly plans
  async findAll(): Promise<WeeklyPlan[]> {
    try {
      return this.weeklyPlanRepository.find();
    } catch (error) {
      throw new EcommerceBadRequestException(error.message);
    }
  }

  // Get a weekly plan by ID
  async findOne(id: string): Promise<WeeklyPlan> {
    try {
      return this.weeklyPlanRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new EcommerceBadRequestException(error);
    }
  }

  // Update a weekly plan by ID
  async update(
    id: string,
    updateWeeklyPlanDto: UpdateWeeklyPlanDto,
  ): Promise<WeeklyPlan> {
    try {
      const weeklyPlan = await this.weeklyPlanRepository.findOneOrFail({
        where: { id },
      });
      this.weeklyPlanRepository.merge(weeklyPlan, updateWeeklyPlanDto);
      return this.weeklyPlanRepository.save(weeklyPlan);
    } catch (error) {
      throw new EcommerceBadRequestException(error.message);
    }
  }

  // Delete a weekly plan by ID
  async remove(id: string): Promise<void> {
    try {
      await this.weeklyPlanRepository.delete(id);
    } catch (error) {
      throw new EcommerceBadRequestException(error.message);
    }
  }
}
