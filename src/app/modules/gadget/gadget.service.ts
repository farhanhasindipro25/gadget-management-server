import { IGadget } from './gadget.interface';
import { Gadget } from './gadget.model';

const createGadget = async (payload: IGadget): Promise<IGadget> => {
  const result = await Gadget.create(payload);
  return result;
};

export const GadgetService = {
  createGadget,
};
