import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { config } from './src/config/app.config.js'
import { errorMiddleware } from './src/middleware/error.middleware.js'
import usersRouter from './src/modules/users/users.router.js'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => res.json({ status: 'ok' }))

// modules
app.use('/api/users', usersRouter)

// error handler — завжди останній
app.use(errorMiddleware)

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
