import { z } from 'zod'

export const Appointment = z.object({
  startTime: z.date(),
  endTime: z.date(),
  serviceId: z.string().min(1, 'Service ID is required'),
  memberId: z.string().min(1, 'Member ID is required'),
  organizationId: z.string().min(1, 'Organization ID is required'),
  clientId: z.string().min(1, 'Client ID is required'),
})
export type Appointment = z.infer<typeof Appointment>

export const createAppointment = Appointment.omit({
  startTime: true,
  endTime: true,
}).extend({
  date: z.iso.date(),
  time: z.iso.time({ precision: 0 }),
  duration: z.number().int().positive().optional(),
})
export type CreateAppointment = z.infer<typeof createAppointment>
