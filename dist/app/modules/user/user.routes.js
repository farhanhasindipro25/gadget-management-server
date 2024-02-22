"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints related to user management
 */
/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *            description: User email needed for user creation
 *          password:
 *            type: string
 *            description: User password needed for user creation
 *        example:
 *          email: dipro@gmail.com
 *          password: password123!@#
 */
/**
 * @swagger
 * /users/create-user:
 *   post:
 *     summary: Create a new user
 *     description: Endpoint to create a new user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful user creation
 *         content:
 *           application/json:
 *             example:
 *               message: "User created successfully"
 *               data: { result }
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: "Validation error"
 *               message: "Invalid request payload"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *               message: "Something went wrong"
 */
router.post('/create-user', (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserZodSchema), user_controller_1.UserController.createUser);
exports.UserRoutes = router;
