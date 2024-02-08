import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../common/helpers/catchAsync';
import sendResponse from '../../../common/helpers/sendResponse';
import { UserService } from './user.service';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req.body;
    const result = await UserService.createUser(user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'New user has been registered!',
      data: result,
    });
  },
);

export const UserController = { createUser };
