import { ISales } from './sales.interface';
import { Sales } from './sales.model';

const createSale = async (payload: ISales): Promise<ISales> => {
  const result = await Sales.create(payload);
  return result;
};

export const SalesService = {
  createSale,
};
