import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../common/helpers/catchAsync';
import sendResponse from '../../../common/helpers/sendResponse';
import { ILoginUserResponse } from './auth.interface';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successful!',
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
