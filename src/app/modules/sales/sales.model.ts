import { Schema, model } from 'mongoose';
import { ISales, SalesModel } from './sales.interface';

const salesSchema = new Schema<ISales>(
  {
    product_title: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    buyer_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Sales = model<ISales, SalesModel>('Sales', salesSchema);
