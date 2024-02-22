import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { GadgetController } from './gadget.controller';
import { GadgetValidation } from './gadget.validation';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Gadgets
 *   description: API endpoints related to gadget management
 */

/**
 * @swagger
 * components:
 *    schemas:
 *      Gadget:
 *        type: object
 *        required:
 *          - product_title
 *          - price
 *          - quantity
 *          - model_number
 *          - category
 *          - connectivity
 *          - power_source
 *          - features
 *        properties:
 *          product_title:
 *            type: string
 *            description: Title of the gadget
 *          price:
 *            type: number
 *            description: Price of the gadget
 *          quantity:
 *            type: number
 *            description: Quantity available
 *          brand:
 *            type: string
 *            description: Brand of the gadget
 *          model_number:
 *            type: string
 *            description: Model number of the gadget (unique)
 *          category:
 *            type: string
 *            description: Category of the gadget
 *          connectivity:
 *            type: string
 *            description: Connectivity options of the gadget
 *          power_source:
 *            type: string
 *            description: Power source of the gadget
 *          features:
 *            type: string
 *            description: Features of the gadget
 *       example:
 *          product_title: Smartphone
 *          price: 599.99
 *          quantity: 100
 *          brand: ABC
 *          model_number: XYZ123
 *          category: Electronics
 *          connectivity: WiFi, Bluetooth
 *          power_source: Battery
 *          features: Touchscreen, Camera
 */

/**
 * @swagger
 * /gadgets/create-gadget:
 *   post:
 *     summary: Create a new gadget
 *     description: Endpoint to create a new gadget.
 *     tags: [Gadgets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             gadget:
 *               product_title: Smartphone
 *               price: 599.99
 *               quantity: 100
 *               brand: ABC
 *               model_number: XYZ123
 *               category: Electronics
 *               connectivity: WiFi, Bluetooth
 *               power_source: Battery
 *               features: Touchscreen, Camera
 *     responses:
 *       200:
 *         description: New gadget has been added
 *         content:
 *           application/json:
 *             example:
 *               message: "New gadget has been added!"
 *               data: { result }
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: "Validation error"
 *               message: "Invalid request payload"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *               message: "Something went wrong"
 */

router.post(
  '/create-gadget',
  validateRequest(GadgetValidation.createGadgetZodSchema),
  GadgetController.createGadget,
);

/**
 * @swagger
 * /gadgets/{id}:
 *   patch:
 *     summary: Update gadget details
 *     description: Endpoint to update gadget details.
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the gadget to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             product_title: Updated Smartphone
 *             price: 699.99
 *             quantity: 150
 *             brand: XYZ
 *             category: Electronics
 *             connectivity: WiFi, Bluetooth, 5G
 *             power_source: Battery, Solar
 *             features: Touchscreen, Camera, AI
 *     responses:
 *       200:
 *         description: Gadget information updated
 *         content:
 *           application/json:
 *             example:
 *               message: "Gadget information updated!"
 *               data: { result }
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: "Validation error"
 *               message: "Invalid request payload"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *               message: "Something went wrong"
 */

router.patch(
  '/:id',
  validateRequest(GadgetValidation.updateGadgetZodSchema),
  GadgetController.updateGadgetDetails,
);
router.get('/:id', GadgetController.getGadgetDetails);
router.get('/', GadgetController.getGadgetsList);

router.delete('/bulk-delete', GadgetController.bulkDeleteGadgets);
router.delete('/:id', GadgetController.deleteGadget);

export const GadgetRoutes = router;
