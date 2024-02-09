import express from 'express';
import { SalesController } from './sales.controller';

const router = express.Router();

router.post('/sell-gadget', SalesController.createSale);

export const SalesRoutes = router;
