import { Application } from 'express';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import config from '../../config';

const CSS_URL = '../helpers/swaggerUI.css';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gadget Management',
      version: '1.0.0',
      description:
        'API documentation for a gadget management system built with ExpressJS, MongoDB, Mongoose, Typescript, and Zod. The version control is maintained beautifully with EsLint, Prettier, Husky, Lint-staged and Winston.',
      contact: {
        name: 'Farhan Hasin Dipro',
        email: 'farhan.hasin.25@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
      },
    ],
  },
  apis: [path.resolve(__dirname, '../../app/modules/**/*.routes.ts')],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Application): void {
  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { customCssUrl: CSS_URL }),
  );
  console.log(`Docs available at http://localhost:${config.port}/docs`);
}
