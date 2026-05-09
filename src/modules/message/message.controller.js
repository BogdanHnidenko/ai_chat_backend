import { MessageService } from './message.service.js'
import { catchAsync } from '../../utils/catchAsync.js'
import { initSSE, sendSSEEvent } from '../../utils/sse.js'


export const sendMessage = catchAsync(async (req, res) => {
  initSSE(res)

  console.log(req)
  const { message } = req.body

  for await (const chunk of MessageService.sendMes(message)) {
    sendSSEEvent({ res, data: chunk })
  }

  res.end()
})
