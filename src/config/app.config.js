// Тут централізована конфігурація — env змінні, константи
// НЕ хардкодь значення по всьому проєкту, тільки тут

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'change-me-in-production',
  db: {
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017/ai-chat',
  },
}
