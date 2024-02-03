import { Model } from 'mongoose';

export interface IGadget {
  product_title: string;
  price: number;
  quantity: number;
  brand: string;
  model_number: string;
  category: string;
  connectivity: string;
  power_source: string;
  features: string;
}

export type GadgetModel = Model<IGadget>;
