import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../common/catchAsync';
import sendResponse from '../../../common/sendResponse';
import { GadgetService } from './gadget.service';

const createGadget: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { gadget } = req.body;
    const result = await GadgetService.createGadget(gadget);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'New gadget has been added!',
      data: result,
    });
    next();
  },
);

export const GadgetController = {
  createGadget,
};
