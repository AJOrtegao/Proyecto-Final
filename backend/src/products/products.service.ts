import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async create(product: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }

  async update(id: string, updateData: Partial<Product>): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    );
    if (!updatedProduct) {
      throw new NotFoundException(`No se pudo actualizar: ID ${id} no encontrado`);
    }
    return updatedProduct;
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`No se encontró producto con ID ${id} para eliminar`);
    }
    return { deleted: true };
  }
}
