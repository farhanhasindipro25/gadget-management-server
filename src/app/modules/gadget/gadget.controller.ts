import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../common/catchAsync';
import pick from '../../../common/pick';
import sendResponse from '../../../common/sendResponse';
import { paginationFields } from '../../../constants/pagination';
import { IGadget } from './gadget.interface';
import { GadgetService } from './gadget.service';

const createGadget: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { gadget } = req.body;
    const result = await GadgetService.createGadget(gadget);
    sendResponse<IGadget>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'New gadget has been added!',
      data: result,
    });
    next();
  },
);

const getGadgetsList = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields);
    const result = await GadgetService.getGadgetsList(paginationOptions);

    sendResponse<IGadget[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All gadget data retrieved',
      meta: result.meta,
      data: result.data,
    });
    next();
  },
);

export const GadgetController = {
  createGadget,
  getGadgetsList,
};
