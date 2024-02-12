import { Schema, model } from 'mongoose';
import { ISales, SalesModel } from './sales.interface';

const salesSchema = new Schema<ISales>(
  {
    buyer_name: {
      type: String,
      required: true,
    },
    sale: {
      type: Schema.Types.ObjectId,
      ref: 'Gadget',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Sales = model<ISales, SalesModel>('Sales', salesSchema);
