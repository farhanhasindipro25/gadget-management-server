import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SalesController } from './sales.controller';
import { SalesValidation } from './sales.validation';

const router = express.Router();

router.post(
  '/sell-gadget',
  validateRequest(SalesValidation.createSalesZodSchema),
  SalesController.createSale,
);

router.patch(
  '/:id',
  validateRequest(SalesValidation.updateSaleZodSchema),
  SalesController.updateSaleDetails,
);
router.get('/', SalesController.getSalesHistory);
router.delete('/:id', SalesController.deleteSale);

export const SalesRoutes = router;
