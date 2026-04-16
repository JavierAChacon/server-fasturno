import prisma from '../../lib/prisma'

export const findUserById = (id: string) => 
  prisma.user.findUnique({ where: { id } })

export const findUserByEmail = (email: string) => 
  prisma.user.findUnique({ where: { email } })

export const findUserByCedula = (cedula: string) => 
  prisma.user.findUnique({ where: { cedula } })

export const findAllUsers = () => 
  prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
