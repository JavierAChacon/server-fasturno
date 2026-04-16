import { betterAuth } from 'better-auth'
import { prismaAdapter } from '@better-auth/prisma-adapter'
import { organization } from 'better-auth/plugins'
import prisma from './prisma'

const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [
    organization({
      requireEmailVerificationOnInvitation: false,
      schema: {
        organization: {
          additionalFields: {
            address: {
              type: 'string',
              required: false,
            },
            slogan: {
              type: 'string',
              required: false,
            },
          },
        },
      },
    }),
  ],
  user: {
    additionalFields: {
      cedula: {
        type: 'string',
        required: true,
        unique: true,
      },
      phone: {
        type: 'string',
        required: true,
      },
      lastName: {
        type: 'string',
        required: true,
      },
    },
  },
})

export default auth
