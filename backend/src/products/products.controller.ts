import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Product> {
    return this.productsService.findById(id);
  }

  @Post()
  async create(@Body() product: Partial<Product>): Promise<Product> {
    return this.productsService.create(product);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<Product>,
  ): Promise<Product> {
    return this.productsService.update(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.productsService.delete(id);
    return { message: 'Producto eliminado correctamente' };
  }
}
