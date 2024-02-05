import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../common/helpers/paginationHelper';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interfaces/pagination';
import { IGadget } from './gadget.interface';
import { Gadget } from './gadget.model';

const createGadget = async (payload: IGadget): Promise<IGadget> => {
  const result = await Gadget.create(payload);
  return result;
};

const getGadgetsList = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IGadget[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: {
    [key: string]: SortOrder;
  } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const result = await Gadget.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Gadget.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const GadgetService = {
  createGadget,
  getGadgetsList,
};
