import { RequestHandler } from 'express';
import { GadgetService } from './gadget.service';

const createGadget: RequestHandler = async (req, res, next) => {
  try {
    const { gadget } = req.body;
    const result = await GadgetService.createGadget(gadget);

    res.status(200).json({
      success: true,
      message: 'New gadget has been added!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const GadgetController = {
  createGadget,
};
