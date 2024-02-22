"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const path_1 = __importDefault(require("path"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const config_1 = __importDefault(require("../../config"));
const CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css';
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Gadget Management',
            version: '1.0.0',
            description: 'API documentation for a gadget management system built with ExpressJS, MongoDB, Mongoose, Typescript, and Zod. The version control is maintained beautifully with EsLint, Prettier, Husky, Lint-staged and Winston.',
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
    apis: [path_1.default.resolve(__dirname, '../../app/modules/**/*.routes.ts')],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function setupSwagger(app) {
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, { customCssUrl: CSS_URL }));
    console.log(`Docs available at http://localhost:${config_1.default.port}/docs`);
}
exports.setupSwagger = setupSwagger;
