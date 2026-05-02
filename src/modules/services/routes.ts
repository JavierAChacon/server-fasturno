import * as controllers from './controllers'
import { Router } from 'express'

const router = Router()

router.post('/', controllers.createService)
router.get('/', controllers.getServices)
router.get('/:serviceId', controllers.getServiceById)
router.patch('/:serviceId', controllers.updateService)
router.delete('/:serviceId', controllers.deleteService)

export default router
