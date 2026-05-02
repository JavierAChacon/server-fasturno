import prisma from '../../lib/prisma'
import type { Appointment } from './schemas'

export const findOverlappingAppointment = async (memberId: string, startTime: Date, endTime: Date) => {
  return prisma.appointment.findFirst({
    where: {
      memberId,
      status: { not: 'cancelled' },
      AND: [{ startTime: { lt: endTime } }, { endTime: { gt: startTime } }],
    },
  })
}

export const createAppointment = async (data: Appointment) => {
  return prisma.appointment.create({
    data,
    include: {
      service: true,
      member: {
        include: {
          user: true,
        },
      },
    },
  })
}

export const getAppoinmentById = (appointmentId: string) => {
  return prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: {
      service: true,
      client: true,
      member: {
        include: {
          user: true,
        },
      },
    },
  })
}
