import db from "../../utils/DataBase.js"
import { v4 as uuidv4 } from 'uuid'

export const UsersService = {
  getAll() {
    return db.prepare('SELECT id, name, email, created_at FROM users').all()
  },

  getById(id) {
    return db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(id)
  },

  create({ name, email }) {
    const id = uuidv4()
    db.prepare('INSERT INTO users (id, name, email) VALUES (?, ?, ?)').run(id, name, email)
    return { id, name, email }
  },

  findByEmail(email) {
    const row = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
    return row?.id ?? null
  },
}
