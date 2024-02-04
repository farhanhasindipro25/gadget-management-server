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
  const { page = 1, limit = 10 } = paginationOptions;
  const skip = (page - 1) * limit;
  const result = await Gadget.find().sort().skip(skip).limit(limit);
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
