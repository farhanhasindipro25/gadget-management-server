import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { GadgetController } from './gadget.controller';
import { GadgetValidation } from './gadget.validation';

const router = express.Router();
router.post(
  '/create-gadget',
  validateRequest(GadgetValidation.createGadgetZodSchema),
  GadgetController.createGadget,
);

router.get('/', GadgetController.getGadgetsList);

export const GadgetRoutes = router;
