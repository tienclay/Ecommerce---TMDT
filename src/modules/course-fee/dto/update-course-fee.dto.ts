import { PartialType } from '@nestjs/swagger';
import { CreateCourseFeeDto } from './create-course-fee.dto';

export class UpdateCourseFeeDto extends PartialType(CreateCourseFeeDto) {}
