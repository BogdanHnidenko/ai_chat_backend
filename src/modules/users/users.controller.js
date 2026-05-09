// Тут ТІЛЬКИ обробка req/res — прийняв запит, віддав відповідь
// Логіка делегується в service, controller не знає про БД

import { UsersService } from './users.service.js'
import { AppError } from '../../utils/AppError.js'
import { catchAsync } from '../../utils/catchAsync.js'

export const getUsers = catchAsync(async (req, res) => {
  const users = await UsersService.getAll()
  res.success(users)
})

export const getUserById = catchAsync(async (req, res) => {
  const user = await UsersService.getById(req.params.id)
  if (!user) throw new AppError('User not found', 404)
  res.success(user)
})

export const createUser = catchAsync(async (req, res) => {
  const user = await UsersService.create(req.body)
  res.success(user, 201)
})
