import express from 'express'
import userController from './user.controller'

const router = express.Router()

router.post(
  '/create-user',
  // validateRequest(UserValidation.createUserZodSchema),
  userController.createUser,
)

export default router
