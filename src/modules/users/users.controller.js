// Тут ТІЛЬКИ обробка req/res — прийняв запит, віддав відповідь
// Логіка делегується в service, controller не знає про БД

import { UsersService } from './users.service.js'

export const getUsers = async (req, res) => {
  const users = await UsersService.getAll()
  res.json(users)
}

export const getUserById = async (req, res) => {
  const user = await UsersService.getById(req.params.id)
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json(user)
}

export const createUser = async (req, res) => {
  const user = await UsersService.create(req.body)
  res.status(201).json(user)
}
