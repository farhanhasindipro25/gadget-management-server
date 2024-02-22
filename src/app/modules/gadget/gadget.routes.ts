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

/**
 * @swagger
 * /gadgets:
 *   get:
 *     summary: Get list of gadgets
 *     description: Endpoint to retrieve a list of gadgets.
 *     tags: [Gadgets]
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search term for filtering gadgets
 *       - in: query
 *         name: price
 *         schema:
 *           type: number
 *         description: Filter gadgets by price
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter gadgets by category
 *       - in: query
 *         name: connectivity
 *         schema:
 *           type: string
 *         description: Filter gadgets by connectivity options
 *       - in: query
 *         name: power_source
 *         schema:
 *           type: string
 *         description: Filter gadgets by power source
 *       - in: query
 *         name: features
 *         schema:
 *           type: string
 *         description: Filter gadgets by features
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number for paginated results
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: List of gadgets retrieved
 *         content:
 *           application/json:
 *             example:
 *               message: "All gadget data retrieved"
 *               meta: { page: 1, limit: 10, total: 50 }
 *               data: [{ gadget1 }, { gadget2 }, ...]
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *               message: "Something went wrong"
 */
router.get('/:id', GadgetController.getGadgetDetails);

/**
 * @swagger
 * /gadgets/{id}:
 *   get:
 *     summary: Get gadget details
 *     description: Endpoint to retrieve details of a specific gadget.
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the gadget to retrieve details
 *     responses:
 *       200:
 *         description: Gadget details retrieved
 *         content:
 *           application/json:
 *             example:
 *               message: "Gadget details retrieved"
 *               data: { result }
 *       404:
 *         description: Gadget not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Not Found"
 *               message: "Gadget not found with the provided ID"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *               message: "Something went wrong"
 */
router.get('/', GadgetController.getGadgetsList);

/**
 * @swagger
 * /gadgets/bulk-delete:
 *   delete:
 *     summary: Delete multiple gadgets
 *     description: Endpoint to delete multiple gadgets based on their IDs.
 *     tags: [Gadgets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             ids: ["id1", "id2", "id3"]
 *     responses:
 *       200:
 *         description: Gadgets deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Gadgets deleted successfully!
 *               data: [result]
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: "Validation error"
 *               message: "Invalid request payload"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               error: "Not Found"
 *               message: "No gadgets found with the provided IDs."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 *               message: "Something went wrong"
 */
router.delete('/bulk-delete', GadgetController.bulkDeleteGadgets);

/**
 * @swagger
 * /gadgets/{id}:
 *   delete:
 *     summary: Delete a gadget
 *     description: Endpoint to delete a specific gadget.
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the gadget to delete
 *     responses:
 *       200:
 *         description: Gadget deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Gadget deleted successfully!"
 *               data: { result}
 *       404:
 *         description: Gadget not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Not Found"
 */
router.delete('/:id', GadgetController.deleteGadget);

export const GadgetRoutes = router;
