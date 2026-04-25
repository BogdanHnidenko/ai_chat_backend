// Тут shared middleware — виконується ДО controller
// Сюди: перевірка токена, ролі, rate limiting, логування запитів

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  // тут буде верифікація JWT (наприклад через jsonwebtoken)
  req.user = { id: 1, role: 'user' } // прикріплюємо юзера до запиту
  next()
}
