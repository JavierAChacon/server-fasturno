import { z } from 'zod'

export const createService = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  duration: z.number().int().positive('Duration must be positive'),
  price: z.number().nonnegative('Price cannot be negative'),
  organizationId: z.string().min(1, 'Organization ID is required'),
})

export const updateService = createService.partial().omit({ organizationId: true })

export type CreateServiceRequest = z.infer<typeof createService>
export type UpdateServiceRequest = z.infer<typeof updateService>
