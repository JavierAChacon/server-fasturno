import prisma from '../../lib/prisma'
import type { CreateServiceRequest, UpdateServiceRequest } from './schemas'

export const createService = (data: CreateServiceRequest) => {
  return prisma.service.create({
    data,
  })
}

export const getServicesByOrganization = (organizationId: string) => {
  return prisma.service.findMany({
    where: { organizationId },
  })
}

export const getServiceById = (id: string) => {
  return prisma.service.findUnique({
    where: { id },
  })
}

export const updateService = (id: string, data: UpdateServiceRequest) => {
  return prisma.service.update({
    where: { id },
    data,
  })
}

export const deleteService = (id: string) => {
  return prisma.service.delete({
    where: { id },
  })
}
