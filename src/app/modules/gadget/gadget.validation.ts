import { z } from 'zod';

const createGadgetZodSchema = z.object({
  gadget: z.object({
    product_title: z.string({
      required_error: 'Product title is required!',
    }),
    price: z.number({
      required_error: 'Product price is required!',
    }),
    quantity: z.number({
      required_error: 'Product quantity is required!',
    }),
    brand: z.string(),
    model_number: z.string({
      required_error: 'Model number is required!',
    }),
    category: z.string({
      required_error: 'Product category is required!',
    }),
    connectivity: z.string({
      required_error: 'Connectivity is required!',
    }),
    power_source: z.string({
      required_error: 'Power source is required!',
    }),
    features: z.string({
      required_error: 'Product features are required!',
    }),
  }),
});

export const GadgetValidation = {
  createGadgetZodSchema,
};
