import { Controller, Get, Post, Body, Param, NotFoundException, Request, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll(@Request() req): Promise<Order[]> {
    const userId = req.user.sub;
    return this.ordersService.findAllByUser(userId);
    }

  @Get(':id')
  async findById(@Param('id') id: string, @Request() req): Promise<Order> {
    const numericId = parseInt(id, 10);
    const userId = req.user.sub;
    return this.ordersService.findByIdAndUser(numericId, userId);
  }

  @Post()
  async create(@Request() req, @Body() createOrderDto: CreateOrderDto): Promise<Order> {
    const userId = req.user.sub;
    return this.ordersService.create(userId, createOrderDto);
  }
} 
