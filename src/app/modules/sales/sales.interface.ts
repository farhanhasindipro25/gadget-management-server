import { Model, Types } from 'mongoose';
import { IGadget } from '../gadget/gadget.interface';

export type ISales = {
  buyer_name: string;
  sale: Types.ObjectId | IGadget;
};

export type SalesModel = Model<ISales, Record<string, unknown>>;
