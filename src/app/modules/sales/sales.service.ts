import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../common/helpers/paginationHelper';
import { IFilters } from '../../../interfaces/filters';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interfaces/pagination';
import { ISales } from './sales.interface';
import { Sales } from './sales.model';

const createSale = async (payload: ISales): Promise<ISales> => {
  const result = await Sales.create(payload);
  return result;
};

const getSalesHistory = async (
  filters: IFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ISales[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);
  const { searchTerm, ...filterData } = filters;
  const salesSearchableFields = [
    'product_title',
    'buyer_name',
    'brand',
    'model_number',
  ];
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: salesSearchableFields.map(field => ({
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

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Sales.find(whereCondition)
    .populate('sale')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Sales.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateSaleDetails = async (
  id: string,
  payload: Partial<ISales>,
): Promise<ISales | null> => {
  const result = await Sales.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSale = async (id: string): Promise<ISales | null> => {
  const result = await Sales.findByIdAndDelete(id);
  return result;
};

export const SalesService = {
  createSale,
  getSalesHistory,
  updateSaleDetails,
  deleteSale,
};
