import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { Model } from 'mongoose';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>) {}

  create(payment: Partial<Payment>) {
    return this.paymentModel.create(payment);
  }

  findAll() {
    return this.paymentModel.find().exec();
  }
}
