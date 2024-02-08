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

router.patch(
  '/:id',
  validateRequest(GadgetValidation.updateGadgetZodSchema),
  GadgetController.updateGadgetDetails,
);
router.get('/:id', GadgetController.getGadgetDetails);
router.get('/', GadgetController.getGadgetsList);

router.delete('/:id', GadgetController.deleteGadget);

export const GadgetRoutes = router;
