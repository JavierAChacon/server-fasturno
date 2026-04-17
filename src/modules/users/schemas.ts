import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string('Name is required').min(1, 'Name is required'),
  lastName: z.string('Last name is required').min(1, 'Last name is required'),
  email: z.string('Email is required').email('Invalid email').min(1, 'Email is required'),
  password: z.string('Password is required').min(6, 'Password must be at least 6 characters'),
  cedula: z.string('Cedula is required').min(1, 'Cedula is required'),
  phone: z.string('Phone is required').min(1, 'Phone is required'),
  image: z.string().optional(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
