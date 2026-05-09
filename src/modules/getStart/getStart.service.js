import { UsersService } from '../users/users.service.js'
import { AppError } from '../../utils/AppError.js'
import { ChatService } from '../chats/chats.service.js'
import { PresetsService } from '../presets/presets.service.js'

export const GetStartService = {
  getAllData(id) {
    const user = UsersService.getById(id)
    if (!user) throw new AppError('User not found', 404)
    const chats = ChatService.getAllChats(id)
    const presets = PresetsService.getAllByUser(id)

    return { user, chats, presets }
  },
}
