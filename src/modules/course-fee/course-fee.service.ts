import { Injectable } from '@nestjs/common';
import { CreateCourseFeeDto } from './dto/create-course-fee.dto';
import { UpdateCourseFeeDto } from './dto/update-course-fee.dto';

@Injectable()
export class CourseFeeService {
  create(createCourseFeeDto: CreateCourseFeeDto) {
    return 'This action adds a new courseFee';
  }

  findAll() {
    return `This action returns all courseFee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseFee`;
  }

  update(id: number, updateCourseFeeDto: UpdateCourseFeeDto) {
    return `This action updates a #${id} courseFee`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseFee`;
  }
}
