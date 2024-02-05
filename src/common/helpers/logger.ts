/* eslint-disable no-undef */
import path from 'path'
import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
const { combine, timestamp, label, printf } = format

//custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${date.toDateString()} ${hours}:${minutes}:${seconds} [${label}] ${level}: ${message}`
})

const infoLogger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'Gadget Management' }),
    timestamp(),
    myFormat,
    // prettyPrint(),
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successLogs',
        'GM-%DATE%-success.log',
      ),
      datePattern: 'DD-MM-YY-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'Gadget Management' }),
    timestamp(),
    myFormat,
    // prettyPrint(),
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errorLogs',
        'GM-%DATE%-error.log',
      ),
      datePattern: 'DD-MM-YY-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export { errorLogger, infoLogger }
