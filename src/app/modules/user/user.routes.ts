import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

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
 * tags:
 *   name: Users
 *   description: API endpoints related to user management
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
 *           example:
 *                 {
 *                   "user": {
 *                        "email":"dipro@gmail.com",
 *                        "password":"password"
 *                   }
 *                 }
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

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
);

export const UserRoutes = router;
