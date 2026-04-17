import prisma from '../../lib/prisma'

export const getMemberById = (id: string) => {
  return prisma.member.findUnique({
    where: { id },
    include: {
      user: true,
    },
  })
}

export const listMembersByOrganization = (organizationId: string) => {
  return prisma.member.findMany({
    where: { organizationId },
    include: {
      user: true,
    },
  })
}
