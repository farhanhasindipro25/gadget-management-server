import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SalesController } from './sales.controller';
import { SalesValidation } from './sales.validation';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: API endpoints related to sales management
 */

/**
 * @swagger
 * /sales/sell-gadget:
 *   post:
 *     summary: Record a new sale
 *     description: Endpoint to record a new sale.
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             sale: { sale details }
 *     responses:
 *       200:
 *         description: Sale recorded successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: 'Your sales has been recorded!'
 *               data: { result }
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: 'Validation error'
 *               message: 'Invalid request payload'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Internal Server Error'
 *               message: 'Something went wrong'
 */
router.post(
  '/sell-gadget',
  validateRequest(SalesValidation.createSalesZodSchema),
  SalesController.createSale,
);

/**
 * @swagger
 * /sales/{id}:
 *   patch:
 *     summary: Update sale details
 *     description: Endpoint to update details of a sale.
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the sale
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             updatedData: { updated data }
 *     responses:
 *       200:
 *         description: Sale details updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: 'Buyer name information updated'
 *               data: { result }
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: 'Validation error'
 *               message: 'Invalid request payload'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Internal Server Error'
 *               message: 'Something went wrong'
 */
router.patch(
  '/:id',
  validateRequest(SalesValidation.updateSaleZodSchema),
  SalesController.updateSaleDetails,
);

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Get sales history
 *     description: Endpoint to retrieve sales history.
 *     tags: [Sales]
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         description: Search term for filtering sales
 *         schema:
 *           type: string
 *       - in: query
 *         name: createdAt
 *         description: Filter sales by creation date
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         description: Number of items per page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sales history retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: 'Sales history data retrieved'
 *               meta: { pagination meta }
 *               data: [sales data]
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Internal Server Error'
 *               message: 'Something went wrong'
 */
router.get('/', SalesController.getSalesHistory);

/**
 * @swagger
 * /sales/{id}:
 *   delete:
 *     summary: Delete a sale
 *     description: Endpoint to delete a sale based on its ID.
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the sale
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sale deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: 'Sale record deleted!'
 *               data: { result }
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Internal Server Error'
 *               message: 'Something went wrong'
 */
router.delete('/:id', SalesController.deleteSale);

export const SalesRoutes = router;
