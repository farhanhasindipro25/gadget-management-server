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
  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         product_title: {
  //           $regex: searchTerm,
  //           $options: 'i', // case insensitive
  //         },
  //       },
  //       {
  //         brand: {
  //           $regex: searchTerm,
  //           $options: 'i', // case insensitive
  //         },
  //       },
  //     ],
  //   },
  // ];

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

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

export const GadgetService = {
  createGadget,
  getGadgetsList,
};
