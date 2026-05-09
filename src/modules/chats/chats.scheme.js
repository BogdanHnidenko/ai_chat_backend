import { z } from 'zod'

export const createChatSchema = z.object({
  title: z.string().min(1).max(255).optional(),
})

export const updateChatSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
})

export const syncChatsSchema = z.object({
  chats: z.array(z.object({
    id: z.string(),
    title: z.string().max(255).optional(),
    created_at: z.string().optional(),
  })),
  messages: z.array(z.object({
    id: z.string(),
    chat_id: z.string(),
    role: z.string(),
    content: z.string(),
    created_at: z.string().optional(),
  })),
})
