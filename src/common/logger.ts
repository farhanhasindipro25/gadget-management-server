/* eslint-disable no-undef */
import path from 'path'
import { createLogger, format, transports } from 'winston'
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
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
      level: 'info',
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
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
      level: 'error',
    }),
  ],
})

export { errorLogger, infoLogger }
