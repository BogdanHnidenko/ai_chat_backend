import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { config } from './config/app.config.js'
import { errorMiddleware } from './middleware/error.middleware.js'
import { authMiddleware } from './middleware/auth.middleware.js'
import { requestLogger } from './middleware/request.middleware.js'
import { responseMiddleware } from './middleware/response.middleware.js'
import logger from './utils/logger.js'
import { initSSE, sendSSEEvent } from './utils/sse.js'
import usersRouter from './modules/users/users.router.js'
import messageRouter from './modules/message/message.router.js'
import authRouter from './modules/auth/auth.router.js'
import getStartRouter from './modules/getStart/getStart.router.js'
import presetsRouter from './modules/presets/presets.router.js'

import { initDB } from './utils/DataBase.js'

global.logger = logger

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(responseMiddleware)
app.use(authMiddleware)

// modules
app.use('/api/getStart', getStartRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/message', messageRouter)
app.use('/api/presets', presetsRouter)
// error handler — завжди останній
app.use(errorMiddleware)

app.listen(config.port, () => {
  initDB()
  logger.info(`Server running on port ${config.port}`)
})
