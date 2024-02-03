import { Schema, model } from 'mongoose';
import { GadgetModel, IGadget } from './gadget.interface';

const gadgetSchema = new Schema<IGadget>(
  {
    product_title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
    },
    model_number: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    connectivity: {
      type: String,
      required: true,
    },
    power_source: {
      type: String,
      required: true,
    },
    features: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Gadget = model<IGadget, GadgetModel>('Gadget', gadgetSchema);
