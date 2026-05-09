import { GetStartService } from './getStart.service.js'
import { AppError } from '../../utils/AppError.js'
import { catchAsync } from '../../utils/catchAsync.js'

export const getStartController = catchAsync(async (req, res) => {
  const userId = req.query?.userId
  const result = await GetStartService.getAllData(userId)
  res.success(result)
})

