import jwt from 'jsonwebtoken'
import { config } from '../config/app.config.js'
import { AppError } from '../utils/AppError.js'

const PUBLIC_ROUTES = [
  { method: 'POST', path: '/api/auth/register' },
  { method: 'POST', path: '/api/auth/login' },
]

export const authMiddleware = (req, res, next) => {
  const isPublic = PUBLIC_ROUTES.some(
    route => route.method === req.method && route.path === req.path
  )
  if (isPublic) return next()

  const token = req.headers.authorization
  const userId = req.query?.userId
  if (!token || !userId) {
    return next(new AppError('no auth', 401))
  }

  try {
    const decodedUser = jwt.verify(token, config.jwtSecret)
    if (decodedUser.id !== userId) return next(new AppError('no auth', 401))
    req._user_ = decodedUser
    next()
  } catch {
    next(new AppError('no auth', 401))
  }
}
