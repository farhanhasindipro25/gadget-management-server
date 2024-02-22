'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const app_1 = __importDefault(require('./app'));
const logger_1 = require('./common/helpers/logger');
const index_1 = __importDefault(require('./config/index'));
process.on('uncaughtException', error => {
  logger_1.console.error(
    'Uncaught Exception detected. Server shutting down immediately!',
    error,
  );
  process.exit(1);
});
let server;
function bootstrap() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      yield mongoose_1.default.connect(index_1.default.database_url);
      logger_1.console.log('Database connection is successfull!');
      server = app_1.default.listen(index_1.default.port, () => {
        logger_1.console.log(`App listening to port ${index_1.default.port}`);
      });
    } catch (error) {
      logger_1.console.error('Database connection failed', error);
    }
    process.on('unhandledRejection', error => {
      logger_1.console.error(
        'Unhandled Rejection Detected. Server shutting down immediately!',
        error,
      );
      if (server) {
        server.close(() => {
          logger_1.console.error(error);
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    });
  });
}
bootstrap();
process.on('SIGTERM', () => {
  logger_1.console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
