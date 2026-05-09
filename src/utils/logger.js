import pino from 'pino'
import { config } from '../config/app.config.js'

const isDev = config.nodeEnv !== 'production'

const logger = pino({
  level: isDev ? 'debug' : 'info',
  ...(isDev && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  }),
})

export default logger
