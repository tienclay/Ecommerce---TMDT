// src/order/order.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderDto } from './dto/order.dto';
import { Order } from '@entities';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo đơn hàng mới' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Đơn hàng được tạo thành công',
    type: OrderDto,
  })
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả đơn hàng' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách đơn hàng',
    type: [OrderDto],
  })
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy đơn hàng theo ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID của đơn hàng',
    example: 'order-12345',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Thông tin đơn hàng',
    type: OrderDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy đơn hàng',
  })
  findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật đơn hàng theo ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID của đơn hàng',
    example: 'order-12345',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Đơn hàng được cập nhật thành công',
    type: OrderDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy đơn hàng',
  })
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoá đơn hàng theo ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID của đơn hàng',
    example: 'order-12345',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Đơn hàng được xoá thành công',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy đơn hàng',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.orderService.remove(id);
  }
}
