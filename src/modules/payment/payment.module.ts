import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Order, Payment, User } from '@entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { PayConfig } from '@config';
import { ConfigType } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Order, User]),
    HttpModule.registerAsync({
      inject: [PayConfig.KEY],
      useFactory: (payConfig: ConfigType<typeof PayConfig>) => {
        const { baseURL, headers } = payConfig;
        return {
          baseURL,
          headers,
        };
      },
    }),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
