import { NextFunction, Request, Response } from 'express'
import userService from './user.service'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body
    const result = await userService.createUser(user)
    res.status(200).json({
      sucess: true,
      message: 'New user has been registered!',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export default { createUser }
