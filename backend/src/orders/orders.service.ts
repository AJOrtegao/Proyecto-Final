import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from '../products/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productRepo: Repository(Product),
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepo.find();
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, items } = createOrderDto;

    const order = this.orderRepo.create({ userId });
    await this.orderRepo.save(order);

    const orderItems = await Promise.all(
      items.map(async ({ productId, quantity }) => {
        const product = await this.productRepo.findOneBy({ id: productId });
        const item = this.orderItemRepo.create({
          order,
          product,
          quantity,
        });
        return this.orderItemRepo.save(item);
      }),
    );

    order.items = orderItems;
    return order;
  }
}
