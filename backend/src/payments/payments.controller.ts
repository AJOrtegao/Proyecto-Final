import { Controller, Get, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment } from './schemas/payment.schema';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  getAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  @Post()
  create(@Body() payment: Partial<Payment>): Promise<Payment> {
    return this.paymentsService.create(payment);
  }
}
