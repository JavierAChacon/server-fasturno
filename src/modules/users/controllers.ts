import type { Request, Response } from 'express'
import auth from '../../lib/auth'
import { createUserSchema } from './schemas'
import { registerUser, getUserById, getAllUsers } from './services'
import { findUserByEmail, findUserByCedula } from './repository'
import { successResponse, errorResponse } from '../../utils/response'

export const register = async (req: Request, res: Response) => {
  const data = createUserSchema.parse(req.body)

  const { email, cedula } = req.body

  const isExistingEmail = await findUserByEmail(email)

  if (isExistingEmail) {
    return errorResponse(res, 'El email ya está registrado', 409)
  }

  const isExistingCedula = await findUserByCedula(cedula)

  if (isExistingCedula) {
    return errorResponse(res, 'La cédula ya está registrada', 409)
  }

  const result = await registerUser(data)
  return successResponse(res, result, 'Usuario registrado exitosamente', 201)
}

export const getMe = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: req.headers,
  })

  if (!session) {
    return errorResponse(res, 'No autorizado', 401)
  }

  const user = await getUserById(session.user.id)

  if (!user) {
    return errorResponse(res, 'Usuario no encontrado', 404)
  }

  return successResponse(res, user)
}

export const listUsers = async (_req: Request, res: Response) => {
  const users = await getAllUsers()
  return successResponse(res, users)
}
