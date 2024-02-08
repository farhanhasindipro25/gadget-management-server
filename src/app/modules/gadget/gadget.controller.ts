import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../common/helpers/catchAsync';
import pick from '../../../common/helpers/pick';
import sendResponse from '../../../common/helpers/sendResponse';
import { paginationFields } from '../../../constants/pagination';
import { IFilters } from '../../../interfaces/filters';
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
      meta: {
        page: 0,
        limit: 0,
        total: 0,
      },
    });
    next();
  },
);

const getGadgetsList = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, [
      'searchTerm',
      'price',
      'category',
      'connectivity',
      'power_source',
      'features',
    ]) as IFilters;
    const paginationOptions = pick(req.query, paginationFields);
    const result = await GadgetService.getGadgetsList(
      filters,
      paginationOptions,
    );

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

const getGadgetDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await GadgetService.getGadgetDetails(id);

    sendResponse<IGadget>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Gadget details data retrieved',
      data: result,
    });
    next();
  },
);

const updateGadgetDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await GadgetService.updateGadgetDetails(id, updatedData);

    sendResponse<IGadget>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Gadget information updated!',
      data: result,
    });
    next();
  },
);

export const GadgetController = {
  createGadget,
  getGadgetsList,
  getGadgetDetails,
  updateGadgetDetails,
};
