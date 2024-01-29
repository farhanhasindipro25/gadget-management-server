import { z } from 'zod'

const createUserZodSchema = z.object({
  user: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string().optional(),
  }),
})

export const UserValidation = {
  createUserZodSchema,
}
