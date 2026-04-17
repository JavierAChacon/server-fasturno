import * as controllers from './controllers'
import { Router } from 'express'
import { authMiddleware } from '../../middlewares/auth'
import asyncHandler from '../../utils/asyncHandler'

const router = Router()

router.use(authMiddleware)

router.post('/', asyncHandler(controllers.createAppointment))
router.get('/:appointmentId', asyncHandler(controllers.getAppoinmentById))

export default router
