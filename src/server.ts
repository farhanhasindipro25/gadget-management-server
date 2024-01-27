import mongoose from 'mongoose'
import app from './app'
import { errorLogger, infoLogger } from './common/logger'
import config from './config/index'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    infoLogger.info('Database coonnection is successfull!')

    app.listen(config.port, () => {
      infoLogger.info(`App listening to port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Database connection failed', error)
  }
}

bootstrap()
