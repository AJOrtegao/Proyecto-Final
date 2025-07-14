import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  async create(@Body() product: Partial<Product>): Promise<Product> {
    return this.productsService.create(product);
  }
}
