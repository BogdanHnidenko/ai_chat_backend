// Тут ТІЛЬКИ маршрути — який URL до якого контролера веде
// НЕ пиши бізнес-логіку або роботу з БД тут

import { Router } from 'express'
import { getUsers, getUserById, createUser } from './users.controller.js'

const router = Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', createUser)

export default router
