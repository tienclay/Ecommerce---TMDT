import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { WeeklyPlanService } from './weekly-plan.service';
import { CreateWeeklyPlanDto } from './dto/create-weekly-plan.dto';
import { UpdateWeeklyPlanDto } from './dto/update-weekly-plan.dto';
import { WeeklyPlan } from '@entities';

@ApiTags('weekly-plans')
@Controller('weekly-plans')
export class WeeklyPlanController {
  constructor(private readonly weeklyPlanService: WeeklyPlanService) {}

  // Create a new weekly plan
  @Post()
  @ApiOperation({
    summary: 'Create a new weekly plan.',
  })
  @ApiResponse({
    status: 201,
    description: 'The weekly plan has been successfully created.',
    type: WeeklyPlan,
  })
  async create(
    @Body() createWeeklyPlanDto: CreateWeeklyPlanDto,
  ): Promise<WeeklyPlan> {
    return this.weeklyPlanService.create(createWeeklyPlanDto);
  }

  // Get all weekly plans
  @Get()
  @ApiOperation({
    summary: 'Get all weekly plans.',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all weekly plans.',
    type: [WeeklyPlan],
  })
  async findAll(): Promise<WeeklyPlan[]> {
    return this.weeklyPlanService.findAll();
  }

  // Get a weekly plan by ID
  @Get(':id')
  @ApiOperation({
    summary: 'Get a weekly plan by ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Return a weekly plan by ID.',
    type: WeeklyPlan,
  })
  async findOne(@Param('id') id: string): Promise<WeeklyPlan> {
    return this.weeklyPlanService.findOne(id);
  }

  // Update a weekly plan by ID
  @Patch(':id')
  @ApiOperation({
    summary: 'Update a weekly plan by ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'The weekly plan has been successfully updated.',
    type: WeeklyPlan,
  })
  async update(
    @Param('id') id: string,
    @Body() updateWeeklyPlanDto: UpdateWeeklyPlanDto,
  ): Promise<WeeklyPlan> {
    return this.weeklyPlanService.update(id, updateWeeklyPlanDto);
  }

  // Delete a weekly plan by ID
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a weekly plan by ID.',
  })
  @ApiResponse({
    status: 204,
    description: 'The weekly plan has been successfully deleted.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.weeklyPlanService.remove(id);
  }
}
