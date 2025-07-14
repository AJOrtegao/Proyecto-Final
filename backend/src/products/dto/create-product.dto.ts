import { IsString, IsNumber, IsPositive, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'price debe ser un número' })
  @IsPositive({ message: 'price debe ser un número positivo' })
  price: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'stock debe ser un número' })
  @Min(0, { message: 'stock no puede ser negativo' })
  stock: number;
}
