import db from '../../utils/DataBase.js'
import { v4 as uuidv4 } from 'uuid'

export const ChatService = {
  getAllChats(userId) {
    return db.prepare('SELECT id, title, created_at FROM chats WHERE user_id = ? ORDER BY created_at DESC').all(userId)
  },

  createChat(userId, title = 'New Chat') {
    const id = uuidv4()
    db.prepare('INSERT INTO chats (id, user_id, title) VALUES (?, ?, ?)').run(id, userId, title)
    return { id, userId, title }
  },

  getChatById(chatId, userId) {
    return db.prepare('SELECT * FROM chats WHERE id = ? AND user_id = ?').get(chatId, userId)
  },

  getChatWithMessages(chatId, userId) {
    const chat = this.getChatById(chatId, userId)
    if (!chat) return null
    const messages = db.prepare('SELECT id, role, content, created_at FROM messages WHERE chat_id = ? ORDER BY created_at ASC').all(chatId)
    return { ...chat, messages }
  },

  syncChats(userId, chats, messages) {
    const insertChat = db.prepare('INSERT OR IGNORE INTO chats (id, user_id, title, created_at) VALUES (?, ?, ?, ?)')
    const insertMessage = db.prepare('INSERT OR IGNORE INTO messages (id, chat_id, role, content, created_at) VALUES (?, ?, ?, ?, ?)')

    const sync = db.transaction(() => {
      for (const chat of chats) {
        insertChat.run(chat.id, userId, chat.title ?? 'New Chat', chat.created_at ?? Math.floor(Date.now() / 1000))
      }
      for (const msg of messages) {
        insertMessage.run(msg.id, msg.chat_id, msg.role, msg.content, msg.created_at ?? Math.floor(Date.now() / 1000))
      }
    })

    sync()
    return { synced: { chats: chats.length, messages: messages.length } }
  },

  updateChatTitle(chatId, userId, title) {
    const result = db.prepare('UPDATE chats SET title = ? WHERE id = ? AND user_id = ?').run(title, chatId, userId)
    if (result.changes === 0) return { id: chatId, isActive: false }
    return { id: chatId, isActive: true }
  },

  deleteChat(chatId, userId) {
    const result = db.prepare('DELETE FROM chats WHERE id = ? AND user_id = ?').run(chatId, userId)
    return {}
  },
}
