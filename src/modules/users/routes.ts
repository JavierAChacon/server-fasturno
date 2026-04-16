import { Router } from 'express'
import { register, getMe, listUsers } from './controllers'
import asyncHandler from '../../utils/asyncHandler'

const router = Router()

router.post('/register', asyncHandler(register))
router.get('/me', asyncHandler(getMe))
router.get('/', asyncHandler(listUsers))

export default router
