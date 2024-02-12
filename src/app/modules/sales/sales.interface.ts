import { Model, Types } from 'mongoose';
import { IGadget } from '../gadget/gadget.interface';

export type ISales = {
  product_title: string;
  sale: Types.ObjectId | IGadget;
};

export type SalesModel = Model<ISales, Record<string, unknown>>;
