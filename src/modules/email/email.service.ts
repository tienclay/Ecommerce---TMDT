import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventPayloads } from 'src/common/interfaces/event-types.interface';

interface Email {
  to: string;
  data: any;
}

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  @OnEvent('order.success')
  async orderConfirmationEmail(data: EventPayloads['order.success']) {
    const { orderId, email, name } = data;
    const subject = `Order Completed - ${orderId}`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: 'order-confirmation',
      context: {
        orderId: orderId,
        name: name,
      },
    });
  }
}
