import { Model } from 'mongoose';

export interface ISales {
  product_title: string;
  quantity: number;
  buyer_name: string;
}

export type SalesModel = Model<ISales>;
