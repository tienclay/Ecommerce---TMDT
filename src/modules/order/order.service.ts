// src/order/order.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from '@entities';
import {
  EcommerceBadRequestException,
  EcommerceNotFoundException,
} from '@exceptions';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // Tạo đơn hàng mới
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const order = this.orderRepository.create(createOrderDto);
      return this.orderRepository.save(order);
    } catch (error) {
      throw new EcommerceBadRequestException(error.message);
    }
  }

  // Lấy tất cả đơn hàng
  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['student', 'course', 'courseFee', 'payment'],
    });
  }

  // Lấy đơn hàng theo ID
  async findOne(id: string): Promise<Order> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['student', 'course', 'courseFee', 'payment'],
      });
      if (!order) {
        throw new EcommerceNotFoundException(`Order with ID ${id} not found`);
      }
      return order;
    } catch (error) {
      throw new EcommerceBadRequestException(error.message);
    }
  }

  // Cập nhật đơn hàng
  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    try {
      const order = await this.findOne(id);
      Object.assign(order, updateOrderDto);
      return this.orderRepository.save(order);
    } catch (error) {
      throw new EcommerceBadRequestException(error.message);
    }
  }

  // Xoá đơn hàng
  async remove(id: string): Promise<void> {
    try {
      const order = await this.findOne(id);
      await this.orderRepository.remove(order);
    } catch (error) {
      throw new EcommerceBadRequestException(error.message);
    }
  }
}
