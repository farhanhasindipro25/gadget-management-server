"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *    name: Auth
 *    description: API endpoints related to user authentication
 */
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Endpoint to authenticate and log in a user.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *                email: user@example.com,
 *                password: userPassword12
 *     responses:
 *       200:
 *         description: User login successful
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "User login successful!"
 *               data: { data }
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Validation error"
 *               message: "Invalid request payload"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Internal Server Error"
 *               message: "Something went wrong"
 */
/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     description: Endpoint to refresh the user's access token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             refreshToken: "refreshTokenValue"
 *     responses:
 *       200:
 *         description: Token verified, login successful
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Token verified, login successful!"
 *               data: { new access token }
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Validation error"
 *               message: "Invalid request payload"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Internal Server Error"
 *               message: "Something went wrong"
 */
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginZodSchema), auth_controller_1.AuthController.loginUser);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.refreshTokenZodSchema), auth_controller_1.AuthController.refreshToken);
exports.AuthRoutes = router;
