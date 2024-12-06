import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, User } from '@entities';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
