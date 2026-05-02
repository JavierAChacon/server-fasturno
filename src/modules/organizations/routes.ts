import * as controllers from './controllers'
import { Router } from 'express'
import { authMiddleware } from '../../middlewares/auth'

const router = Router()

router.use(authMiddleware)

router.get('/', controllers.getOrganization)
router.patch('/', controllers.updateOrganization)

export default router
