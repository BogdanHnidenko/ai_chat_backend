import { ChatService } from './chats.service.js'
import { catchAsync } from '../../utils/catchAsync.js'
import { AppError } from '../../utils/AppError.js'

export const getAllChats = catchAsync(async (req, res) => {
  const userId = req._user_.id
  const chats = ChatService.getAllChats(userId)
  res.success(chats)
})

export const getChatById = catchAsync(async (req, res, next) => {
  const userId = req._user_.id
  const result = ChatService.getChatWithMessages(req.params.id, userId)
  if (!result) return next(new AppError('Chat not found', 404))
  res.success(result)
})

export const createChat = catchAsync(async (req, res) => {
  const userId = req._user_.id
  const { title } = req.body
  const chat = ChatService.createChat(userId, title)
  res.success(chat, 201)
})

export const syncLocalChat = catchAsync(async (req, res) => {
  const userId = req._user_.id
  const { chats, messages } = req.body
  const result = ChatService.syncChats(userId, chats, messages)
  res.success(result, 201)
})

export const updateChat = catchAsync(async (req, res) => {
  const userId = req._user_.id
  const { title } = req.body
  const chat = ChatService.updateChatTitle(req.params.id, userId, title)
  res.success(chat)
})

export const deleteChat = catchAsync(async (req, res, next) => {
  const userId = req._user_.id
  const deleted = ChatService.deleteChat(req.params.id, userId)
  if (!deleted) return next(new AppError('Chat not found', 404))
  res.success(null, 204)
})
