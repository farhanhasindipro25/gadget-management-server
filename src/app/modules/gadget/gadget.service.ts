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
  const { searchTerm } = filters;

  const andConditions = [
    {
      $or: [
        {
          product_title: {
            $regex: searchTerm,
            $options: 'i', // case insensitive
          },
        },
        {
          brand: {
            $regex: searchTerm,
            $options: 'i', // case insensitive
          },
        },
      ],
    },
  ];
  const sortConditions: {
    [key: string]: SortOrder;
  } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const result = await Gadget.find({ $and: andConditions })
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
