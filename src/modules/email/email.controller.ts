import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('email')
@ApiTags('Email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Post()
  async sendEmail() {
    // data: EventPayloads['order.success']
    const data = {
      orderId: '123',
      email: 'tien.tadinh1609@hcmut.edu.vn',
      name: 'Tien Ta Dinh',
    };
    return this.emailService.orderConfirmationEmail(data);
  }
}
