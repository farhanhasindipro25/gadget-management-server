"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoLogger = exports.errorLogger = void 0;
/* eslint-disable no-undef */
const path_1 = __importDefault(require("path"));
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, label, printf } = winston_1.format;
//custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${date.toDateString()} ${hours}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});
const infoLogger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(label({ label: 'Gadget Management' }), timestamp(), myFormat),
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'successLogs', 'GM-%DATE%-success.log'),
            datePattern: 'DD-MM-YY-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});
exports.infoLogger = infoLogger;
const errorLogger = (0, winston_1.createLogger)({
    level: 'error',
    format: combine(label({ label: 'Gadget Management' }), timestamp(), myFormat),
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'errorLogs', 'GM-%DATE%-error.log'),
            datePattern: 'DD-MM-YY-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});
exports.errorLogger = errorLogger;
