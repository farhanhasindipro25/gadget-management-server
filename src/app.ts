import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import { setupSwagger } from './common/helpers/swagger';

const app: Application = express();

app.use(cors());
app.use(cookieParser());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application routes
app.use('/api/v1', routes);

// Setup Swagger documentation
setupSwagger(app);

// testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing error logger')
// })

// handle not found reponse
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Route Not Found!',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'An API route with your given path does not seem to exist!',
      },
    ],
  });
  next();
});

app.use(globalErrorHandler);

export default app;
