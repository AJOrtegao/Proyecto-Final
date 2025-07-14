import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UsersService } from '../users/users.service';
import { Product } from '../products/product.entity';  // Importar Product para poder buscar productos

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly itemRepository: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,  // Agregar repositorio de Product

    private readonly usersService: UsersService,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['items'] });
  }

  async findById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!order) throw new NotFoundException(`Orden ID ${id} no encontrada`);
    return order;
  }

  async findAllByUser(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { userId },
      relations: ['items'],
    });
  }

  async findByIdAndUser(id: number, userId: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id, userId },
      relations: ['items'],
    });
    if (!order) throw new NotFoundException(`Orden ID ${id} no encontrada o no pertenece al usuario`);
    return order;
  }

  async create(userId: number, dto: CreateOrderDto): Promise<Order> {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);

    // Buscar y asignar productos a los items de la orden
    const orderItems = await Promise.all(
      dto.items.map(async (item) => {
        const product = await this.productRepository.findOne({ where: { id: item.productId } });
        if (!product) throw new NotFoundException(`Producto con ID ${item.productId} no encontrado`);

        return this.itemRepository.create({
          product,  
          quantity: item.quantity,
        });
      }),
    );

    const order = this.orderRepository.create({
      userId,
      items: orderItems,
    });

    return this.orderRepository.save(order);
  }
}
