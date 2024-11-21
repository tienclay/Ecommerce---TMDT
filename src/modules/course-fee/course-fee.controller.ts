import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseFeeService } from './course-fee.service';
import { CreateCourseFeeDto } from './dto/create-course-fee.dto';
import { UpdateCourseFeeDto } from './dto/update-course-fee.dto';

@Controller('course-fee')
export class CourseFeeController {
  constructor(private readonly courseFeeService: CourseFeeService) {}

  @Post()
  create(@Body() createCourseFeeDto: CreateCourseFeeDto) {
    return this.courseFeeService.create(createCourseFeeDto);
  }

  @Get()
  findAll() {
    return this.courseFeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseFeeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseFeeDto: UpdateCourseFeeDto,
  ) {
    return this.courseFeeService.update(+id, updateCourseFeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseFeeService.remove(+id);
  }
}
