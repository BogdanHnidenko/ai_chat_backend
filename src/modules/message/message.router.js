import { Router } from 'express'
import { sendMessage } from './message.controller.js'
import { sendMessageSchema } from './message.scheme.js'
import { validate } from '../../middleware/validate.middleware.js'

const router = Router()

router.post('/:id', validate(sendMessageSchema), sendMessage)

export default router