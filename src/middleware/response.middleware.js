export const responseMiddleware = (req, res, next) => {
  res.success = (data = {}, statusCode = 200) => {
    res.status(statusCode).json({ status: 'done', data })
  }
  next()
}