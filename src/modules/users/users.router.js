// Тут ТІЛЬКИ маршрути — який URL до якого контролера веде
// НЕ пиши бізнес-логіку або роботу з БД тут

import { Router } from 'express'
import { getUsers, getUserById, createUser } from './users.controller.js'
import { authMiddleware } from '../../middleware/auth.middleware.js'

const router = Router()

router.get('/', authMiddleware, getUsers)
router.get('/:id', authMiddleware, getUserById)
router.post('/', createUser)

export default router
