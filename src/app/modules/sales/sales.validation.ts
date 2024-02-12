import { z } from 'zod';

const createSalesZodSchema = z.object({
  sale: z.object({
    buyer_name: z.string({
      required_error: 'Product title is required!',
    }),
    sale: z.string({
      required_error: 'Sale is required!',
    }),
  }),
});
const updateSaleZodSchema = z.object({
  buyer_name: z.string({
    required_error: 'Product title is required!',
  }),
});

export const SalesValidation = {
  createSalesZodSchema,
  updateSaleZodSchema,
};
