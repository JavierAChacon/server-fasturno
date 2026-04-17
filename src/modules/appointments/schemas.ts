import { z } from 'zod'

export const createAppointment = z.object({
  startTime: z.string().transform((val) => new Date(val)),
  serviceId: z.string().min(1, 'Service ID is required'),
  memberId: z.string().min(1, 'Member ID is required'),
  organizationId: z.string().min(1, 'Organization ID is required'),
  clientId: z.string().min(1, 'Client ID is required'),
})

export type CreateAppointmentRequest = z.infer<typeof createAppointment>
