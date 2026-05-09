import 'dotenv/config'

export const config = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  db: {
    url: process.env.DATABASE_URL,
  },
}
