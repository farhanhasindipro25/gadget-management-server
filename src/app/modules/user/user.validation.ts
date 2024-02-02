import { z } from 'zod';

const createUserZodSchema = z.object({
  user: z.object({
    email: z.string(),
    password: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
