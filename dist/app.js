"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const swagger_1 = require("./common/helpers/swagger");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Setup Swagger documentation
(0, swagger_1.setupSwagger)(app);
//application routes
app.use('/api/v1', routes_1.default);
// testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing error logger')
// })
// handle not found reponse
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
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
app.use(globalErrorHandler_1.default);
exports.default = app;
