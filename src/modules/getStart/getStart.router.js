import { Router } from 'express'
import { getStartController } from './getStart.controller.js'

const router = Router()

router.get('/', getStartController)

export default router
