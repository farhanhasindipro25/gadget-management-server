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

export const SalesRoutes = router;
