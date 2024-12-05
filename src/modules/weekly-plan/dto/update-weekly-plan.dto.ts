import { PartialType } from '@nestjs/swagger';
import { CreateWeeklyPlanDto } from './create-weekly-plan.dto';

export class UpdateWeeklyPlanDto extends PartialType(CreateWeeklyPlanDto) {}
