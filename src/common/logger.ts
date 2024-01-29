import winston from 'winston'

const infoLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({
    //   filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
    //   level: 'info',
    // }),
  ],
})

const errorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({
    //   filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
    //   level: 'error',
    // }), 
  ],
})

export { errorLogger, infoLogger }