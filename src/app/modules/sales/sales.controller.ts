import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../common/helpers/catchAsync';
import sendResponse from '../../../common/helpers/sendResponse';
import { ISales } from './sales.interface';
import { SalesService } from './sales.service';

const createSale: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { sale } = req.body;
    const result = await SalesService.createSale(sale);
    sendResponse<ISales>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Your sales has been recorded!',
      data: result,
      meta: {
        page: 0,
        limit: 0,
        total: 0,
      },
    });
  },
);

export const SalesController = {
  createSale,
};
