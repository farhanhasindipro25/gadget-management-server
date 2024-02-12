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
  async (req: Request, res: Response) => {
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

const updateGadgetDetails = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await GadgetService.updateGadgetDetails(id, updatedData);

  sendResponse<IGadget>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Gadget information updated!',
    data: result,
  });
});

const deleteGadget = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await GadgetService.deleteGadget(id);

  sendResponse<IGadget>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Gadget deleted successfully!',
    data: result,
  });
});

const bulkDeleteGadgets = catchAsync(async (req: Request, res: Response) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid or empty array of gadget IDs',
    });
  }

  const result = await GadgetService.bulkDeleteGadgets(ids);
  if (result && result.length > 0) {
    sendResponse<IGadget[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Gadgets deleted successfully!',
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No gadgets found with the provided IDs.',
    });
  }
});

export const GadgetController = {
  createGadget,
  getGadgetsList,
  getGadgetDetails,
  updateGadgetDetails,
  deleteGadget,
  bulkDeleteGadgets,
};
