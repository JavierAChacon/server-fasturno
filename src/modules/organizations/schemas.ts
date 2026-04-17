import { z } from 'zod'

export const updateOrganization = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().optional(),
  slogan: z.string().optional(),
  logo: z.string().url('Logo must be a valid URL').optional(),
}).partial()

export type UpdateOrganizationRequest = z.infer<typeof updateOrganization>
