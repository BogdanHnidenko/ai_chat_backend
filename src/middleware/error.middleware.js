import logger from '../utils/logger.js'

export const errorMiddleware = (err, req, res, next) => {
  const status = err.statusCode || err.status || 500
  const message = err.message || 'Internal Server Error'

  if (err.isOperational) {
    logger.warn({ status, err }, message)
  } else {
    logger.error({ status, err }, message)
  }

  res.status(status).json({ status: "error", error: message })
}
