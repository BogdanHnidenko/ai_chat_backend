import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from "../../utils/DataBase.js"
import { config } from '../../config/app.config.js'
import { AppError } from '../../utils/AppError.js'
import { UsersService } from "../users/users.service.js"

const signToken = (payload) =>
  jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' })

export const authService = {
  async register({ name, email, password }) {
    const existingId = UsersService.findByEmail(email)
    if (existingId) throw new AppError('Email already in use', 409)

    const user = UsersService.create({ name, email })
    const passwordHash = await bcrypt.hash(password, 10)

    db.prepare('INSERT INTO auth_data (user_id, email, password_hash) VALUES (?, ?, ?)').run(user.id, email, passwordHash)

    const token = signToken({ id: user.id, email: user.email })
    return { token, userId: user.id }
  },

  async login({ email, password }) {
    const userId = UsersService.findByEmail(email)
    if (!userId) throw new AppError('Invalid email or password', 401)

    const authRow = db.prepare('SELECT password_hash FROM auth_data WHERE user_id = ?').get(userId)
    if (!authRow) throw new AppError('Invalid email or password', 401)

    const isMatch = await bcrypt.compare(password, authRow.password_hash)
    if (!isMatch) throw new AppError('Invalid email or password', 401)

    const user = UsersService.getById(userId)
    const token = signToken({ id: user.id, email: user.email })
    return { token, userId: user.id }
  },
}
