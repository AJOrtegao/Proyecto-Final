import {Controller,Get,Post,Body,Param,NotFoundException,UseGuards,Request,} from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { Order } from '../orders/order.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class UsersController  {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Order> {
    const numericId = parseInt(id, 10);
    const order = await this.ordersService.findById(numericId);
    if (!order) throw new NotFoundException('Orden no encontrada');
    return order;
  }

  @Post()
  async create(@Request() req, @Body() createOrderDto: CreateOrderDto): Promise<Order> {
    const userId = req.user.sub;
    return this.ordersService.create(userId, createOrderDto);
  }
}
