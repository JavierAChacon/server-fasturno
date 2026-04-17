import auth from '../../lib/auth'
import { findAllUsers, findUserById } from './repository'
import type { CreateUserInput } from './schemas'

export const registerUser = (data: CreateUserInput) => {
  return auth.api.signUpEmail({
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
      cedula: data.cedula,
      phone: data.phone,
      lastName: data.lastName,
      image: data.image,
    },
  })
}

export const getUserById = (id: string) => {
  return findUserById(id)
}

export const getAllUsers = () => {
  return findAllUsers()
}
