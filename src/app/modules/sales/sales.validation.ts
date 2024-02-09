import { z } from 'zod';

const createSalesZodSchema = z.object({
  sale: z.object({
    product_title: z.string({
      required_error: 'Product titles is required!',
    }),
    quantity: z.string({
      required_error: 'Product quantity is required!',
    }),
    buyer_name: z.number({
      required_error: 'Buyerr name is required!',
    }),
  }),
});

export const GadgetValidation = {
  createSalesZodSchema,
};
