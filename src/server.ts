import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import { errorLogger, infoLogger } from './common/logger'
import config from './config/index'

process.on('uncaughtException', error => {
  errorLogger.error(
    'Uncaught Exception detected. Server shutting down immediately!',
    error,
  )
  process.exit(1)
})

let server: Server
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    infoLogger.info('Database connection is successfull!')

    server = app.listen(config.port, () => {
      infoLogger.info(`App listening to port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Database connection failed', error)
  }

  process.on('unhandledRejection', error => {
    errorLogger.error(
      'Unhandled Rejection Detected. Server shutting down immediately!',
      error,
    )
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

process.on('SIGTERM', () => {
  infoLogger.info('SIGTERM received')
  if (server) {
    server.close()
  }
})
