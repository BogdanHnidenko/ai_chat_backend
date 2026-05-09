import { authService } from './auth.service.js'
import { catchAsync } from '../../utils/catchAsync.js'

export const register = catchAsync(async (req, res) => {
  const result = await authService.register(req.body)
  res.success(result, 201)
})

export const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body)
  res.success(result)
})
