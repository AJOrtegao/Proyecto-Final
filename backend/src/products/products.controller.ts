import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
@UseGuards(JwtAuthGuard) 
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Product> {
    const product = await this.productsService.findById(id);
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  @Post()
  async create(@Body() createDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateProductDto,
  ): Promise<Product> {
    const updated = await this.productsService.update(id, updateDto);
    if (!updated) throw new NotFoundException('Producto no encontrado');
    return updated;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    const deleted = await this.productsService.delete(id);
    if (!deleted) throw new NotFoundException('Producto no encontrado');
    return { message: 'Producto eliminado correctamente' };
  }
}
