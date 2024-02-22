"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesValidation = void 0;
const zod_1 = require("zod");
const createSalesZodSchema = zod_1.z.object({
    sale: zod_1.z.object({
        buyer_name: zod_1.z.string({
            required_error: 'Product title is required!',
        }),
        sale: zod_1.z.string({
            required_error: 'Sale is required!',
        }),
    }),
});
const updateSaleZodSchema = zod_1.z.object({
    buyer_name: zod_1.z.string({
        required_error: 'Product title is required!',
    }),
});
exports.SalesValidation = {
    createSalesZodSchema,
    updateSaleZodSchema,
};
