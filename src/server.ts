import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';

process.on('uncaughtException', error => {
  console.error(
    'Uncaught Exception detected. Server shutting down immediately!',
    error,
  );
  process.exit(1);
});

let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Database connection is successfull!');

    server = app.listen(config.port, () => {
      console.log(`App listening to port ${config.port}`);
    });
  } catch (error) {
    console.error('Database connection failed', error);
  }

  process.on('unhandledRejection', error => {
    console.error(
      'Unhandled Rejection Detected. Server shutting down immediately!',
      error,
    );
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
