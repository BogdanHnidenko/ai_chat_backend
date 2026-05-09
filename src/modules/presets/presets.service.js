import db from "../../utils/DataBase.js"
import { v4 as uuidv4 } from 'uuid'

export const PresetsService = {
  getAllByUser(userId) {
    return db.prepare('SELECT id, name, description FROM presets WHERE user_id = ? ORDER BY name ASC').all(userId)
  },

  create(userId, name, description = null) {
    const id = uuidv4()
    db.prepare('INSERT INTO presets (id, user_id, name, description) VALUES (?, ?, ?, ?)').run(id, userId, name, description)
    return { id, name, description }
  },

  update(id, userId, { name, description }) {
    const result = db.prepare('UPDATE presets SET name = COALESCE(?, name), description = COALESCE(?, description) WHERE id = ? AND user_id = ?').run(name ?? null, description ?? null, id, userId)
    return result.changes > 0
  },

  delete(id, userId) {
    const result = db.prepare('DELETE FROM presets WHERE id = ? AND user_id = ?').run(id, userId)
    return result.changes > 0
  },
}
