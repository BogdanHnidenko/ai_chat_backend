// Глобальний обробник помилок — підключається ОСТАННІМ в app.js
// Усі помилки з будь-якого маршруту потрапляють сюди через next(error)

export const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'

  console.error(`[${new Date().toISOString()}] ${status} - ${message}`)

  res.status(status).json({ message })
}
