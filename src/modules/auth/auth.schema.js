import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 characters'),
  email: z.string().min(1, 'Email must be at least 1 characters'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
})

export const loginSchema = z.object({
  email: z.string().min(1, 'Email must be at least 1 characters'),
  password: z.string().min(1, 'Password is required'),
})
