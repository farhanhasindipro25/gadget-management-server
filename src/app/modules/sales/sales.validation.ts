import { z } from 'zod';

const createSalesZodSchema = z.object({
  sale: z.object({
    product_title: z.string({
      required_error: 'Product title is required!',
    }),
    sale: z.string({
      required_error: 'Sale is required!',
    }),
  }),
});

export const SalesValidation = {
  createSalesZodSchema,
};
