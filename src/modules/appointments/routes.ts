import * as controllers from './controllers'
import { Router } from 'express'
import { authMiddleware } from '../../middlewares/auth'

const router = Router()

router.use(authMiddleware)

router.post('/', controllers.createAppointment)
router.get('/:appointmentId', controllers.getAppoinmentById)

export default router
