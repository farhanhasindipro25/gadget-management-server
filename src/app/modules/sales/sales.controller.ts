import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../common/helpers/catchAsync';
import pick from '../../../common/helpers/pick';
import sendResponse from '../../../common/helpers/sendResponse';
import { paginationFields } from '../../../constants/pagination';
import { IFilters } from '../../../interfaces/filters';
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

const getSalesHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, ['searchTerm', 'createdAt']) as IFilters;

    const paginationOptions = pick(req.query, paginationFields);
    const result = await SalesService.getSalesHistory(
      filters,
      paginationOptions,
    );

    sendResponse<ISales[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sales history data retrieved',
      meta: result.meta,
      data: result.data,
    });
    next();
  },
);

const updateSaleDetails = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await SalesService.updateSaleDetails(id, updatedData);

  sendResponse<ISales>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyer name information updated',
    data: result,
  });
});

const deleteSale = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SalesService.deleteSale(id);

  sendResponse<ISales>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sale record deleted!',
    data: result,
  });
});

export const SalesController = {
  createSale,
  getSalesHistory,
  updateSaleDetails,
  deleteSale,
};
