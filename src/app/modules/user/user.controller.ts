import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../common/catchAsync';
import sendResponse from '../../../common/sendResponse';
import { UserService } from './user.service';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserService.createUser(user);
    next();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'New user has been registered!',
      data: result,
    });
  },
);

export const UserController = { createUser };
