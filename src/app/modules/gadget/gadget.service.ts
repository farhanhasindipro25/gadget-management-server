import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../common/helpers/paginationHelper';
import { IFilters } from '../../../interfaces/filters';
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
  filters: IFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IGadget[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);
  const { searchTerm, ...filterData } = filters;
  const gadgetsSearchableFields = ['product_title', 'brand', 'model_number'];
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: gadgetsSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const sortConditions: {
    [key: string]: SortOrder;
  } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Gadget.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Gadget.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getGadgetDetails = async (id: string): Promise<IGadget | null> => {
  const result = await Gadget.findById(id);
  return result;
};

const updateGadgetDetails = async (
  id: string,
  payload: Partial<IGadget>,
): Promise<IGadget | null> => {
  const result = await Gadget.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteGadget = async (id: string): Promise<IGadget | null> => {
  const result = await Gadget.findByIdAndDelete(id);
  return result;
};

export const GadgetService = {
  createGadget,
  getGadgetsList,
  getGadgetDetails,
  updateGadgetDetails,
  deleteGadget,
};
