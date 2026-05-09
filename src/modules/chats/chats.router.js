import { Router } from 'express'
import { getAllChats, getChatById, createChat, syncLocalChat, updateChat, deleteChat } from './chats.controller.js'
import { createChatSchema, updateChatSchema, syncChatsSchema } from './chats.scheme.js'
import { validate } from '../../middleware/validate.middleware.js'

const router = Router()

router.get('/', getAllChats)
router.get('/:id', getChatById)
router.post('/', validate(createChatSchema), createChat)
router.post('/sync', validate(syncChatsSchema), syncLocalChat)
router.put('/:id', validate(updateChatSchema), updateChat)
router.delete('/:id', deleteChat)

export default router
