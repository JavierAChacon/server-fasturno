import * as controllers from './controllers'
import { Router } from 'express'
import asyncHandler from '../../utils/asyncHandler'

const router = Router()

router.post('/', asyncHandler(controllers.createService))
router.get('/', asyncHandler(controllers.getServices))
router.get('/:serviceId', asyncHandler(controllers.getServiceById))
router.patch('/:serviceId', asyncHandler(controllers.updateService))
router.delete('/:serviceId', asyncHandler(controllers.deleteService))

export default router
