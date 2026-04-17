import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../../../index'
import * as repository from '../repository'
import * as services from '../services'
import { seededUsers } from '../../../../prisma/seed'

vi.mock('../repository')
vi.mock('../services')
vi.mock('../../../lib/auth', () => {
  const mockAuth = {
    api: {
      getSession: vi.fn(),
      signUpEmail: vi.fn(),
    },
  }
  return {
    default: mockAuth,
    auth: mockAuth,
  }
})

describe('User Endpoints', () => {
  const [mockOwner] = seededUsers

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('POST /api/users/register', () => {
    it('should return 400 and validation errors if data is missing', async () => {
      const response = await request(app)
        .post('/api/users/register')
        .send({ email: 'invalid-email' })

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
      expect(response.body.message).toBe('Validation error')
      expect(response.body.errors[0].message).toBe('Name is required')
    })

    it('should return 409 if email is already taken', async () => {
      vi.mocked(repository.findUserByEmail).mockResolvedValue(mockOwner as any)

      const response = await request(app).post('/api/users/register').send({
        name: mockOwner.name,
        lastName: mockOwner.lastName,
        email: mockOwner.email,
        password: 'password123',
        cedula: mockOwner.cedula,
        phone: mockOwner.phone,
      })

      expect(response.status).toBe(409)
      expect(response.body.message).toBe('El email ya está registrado')
    })

    it('should return 201 and user data if registration is successful', async () => {
      vi.mocked(repository.findUserByEmail).mockResolvedValue(null)
      vi.mocked(repository.findUserByCedula).mockResolvedValue(null)
      vi.mocked(services.registerUser).mockResolvedValue({
        user: { id: mockOwner.id, name: mockOwner.name },
        token: 'mock-token',
      } as any)

      const response = await request(app).post('/api/users/register').send({
        name: mockOwner.name,
        lastName: mockOwner.lastName,
        email: 'new-user@example.com',
        password: 'password123',
        cedula: 'V-99999999',
        phone: '0412-9999999',
      })

      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
      expect(response.body.data.user.id).toBe(mockOwner.id)
      expect(response.body.message).toBe('Usuario registrado exitosamente')
    })
  })
})
