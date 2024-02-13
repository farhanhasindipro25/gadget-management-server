import { z } from 'zod';

const loginZodSchema = z.object({
  email: z.string({
    required_error: 'User email is required!',
  }),
  password: z.string({
    required_error: 'Password is required!',
  }),
});

export const AuthValidation = {
  loginZodSchema,
};
