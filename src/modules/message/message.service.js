import OpenAI from 'openai'
import db from "../../utils/DataBase.js"
import { v4 as uuidv4 } from 'uuid'

const MAX_HISTORY_TOKENS = 3000

function estimateTokens(messages) {
  return messages.reduce((acc, m) => acc + Math.ceil(m.content.length / 4), 0)
}

function trimHistory(history) {
  while (history.length > 1 && estimateTokens(history) > MAX_HISTORY_TOKENS) {
    history.splice(0, 2)
  }
  return history
}

if (!process.env.GROQ_API_KEY) {
  throw new Error('GROQ_API_KEY is not set')
}

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
})

export const MessageService = {
  getMessages(chatId) {
    return db.prepare('SELECT role, content FROM messages WHERE chat_id = ? ORDER BY created_at ASC').all(chatId)
  },

  async *sendMes(chatId, message) {
    const history = this.getMessages(chatId)
    const trimmedHistory = trimHistory([...history])

    const messages = [
      ...trimmedHistory,
      { role: "user", content: message },
    ]

    db.prepare('INSERT INTO messages (id, chat_id, role, content) VALUES (?, ?, ?, ?)').run(uuidv4(), chatId, 'user', message)

    const stream = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      stream: true,
      temperature: 0.5,
      top_p: 1,
      max_completion_tokens: 1024,
    })

    let fullResponse = ""
    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || ""
      fullResponse += text
      yield text
    }

    db.prepare('INSERT INTO messages (id, chat_id, role, content) VALUES (?, ?, ?, ?)').run(uuidv4(), chatId, 'assistant', fullResponse)
  }
}
