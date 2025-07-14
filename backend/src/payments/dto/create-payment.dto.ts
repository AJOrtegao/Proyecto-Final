import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  amount: number;

  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @IsNumber()
  orderId: number;
}
