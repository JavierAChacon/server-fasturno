import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import auth from './lib/auth'
import usersRouter from './modules/users/routes'
import { errorHandler } from './utils/errorHandler'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
)

app.use(express.json())

app.all('/api/auth/*splat', toNodeHandler(auth))

app.use('/api/users', usersRouter)

app.use(errorHandler)

export { app }

if (require.main === module) {
  const port = process.env.PORT || 4000
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}
