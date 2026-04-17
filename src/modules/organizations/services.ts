import prisma from '../../lib/prisma'

export const getOrganizationById = (id: string) => {
  return prisma.organization.findUnique({
    where: { id },
  })
}

export const getRoleOrganization = (userId: string, organizationId: string) => {
  return prisma.member.findFirst({
    where: {
      userId,
      organizationId,
    },
    select: {
      role: true,
    },
  })
}

export const updateOrganization = (id: string, data: { name?: string; address?: string; slogan?: string }) => {
  return prisma.organization.update({
    where: { id },
    data,
  })
}
