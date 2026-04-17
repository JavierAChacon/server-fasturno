import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import auth from './lib/auth'
import { toNodeHandler } from 'better-auth/node'
import { errorHandler } from './utils/errorHandler'
import organizationsRouter from './modules/organizations/routes'
import servicesRouter from './modules/services/routes'
import appointmentsRouter from './modules/appointments/routes'

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
app.use('/api/organizations', organizationsRouter)
app.use('/api/services', servicesRouter)
app.use('/api/appointments', appointmentsRouter)

app.use(errorHandler)

export { app }

if (require.main === module) {
  const port = process.env.PORT || 4000
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}
