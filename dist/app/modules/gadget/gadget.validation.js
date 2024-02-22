"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GadgetValidation = void 0;
const zod_1 = require("zod");
const createGadgetZodSchema = zod_1.z.object({
    gadget: zod_1.z.object({
        product_title: zod_1.z.string({
            required_error: 'Product title is required!',
        }),
        price: zod_1.z.number({
            required_error: 'Product price is required!',
        }),
        quantity: zod_1.z.number({
            required_error: 'Product quantity is required!',
        }),
        brand: zod_1.z.string(),
        model_number: zod_1.z.string({
            required_error: 'Model number is required!',
        }),
        category: zod_1.z.string({
            required_error: 'Product category is required!',
        }),
        connectivity: zod_1.z.string({
            required_error: 'Connectivity is required!',
        }),
        power_source: zod_1.z.string({
            required_error: 'Power source is required!',
        }),
        features: zod_1.z.string({
            required_error: 'Product features are required!',
        }),
    }),
});
const updateGadgetZodSchema = zod_1.z.object({
    product_title: zod_1.z
        .string({
        required_error: 'Product title is required!',
    })
        .optional(),
    price: zod_1.z
        .number({
        required_error: 'Product price is required!',
    })
        .optional(),
    quantity: zod_1.z
        .number({
        required_error: 'Product quantity is required!',
    })
        .optional(),
    brand: zod_1.z.string().optional(),
    model_number: zod_1.z
        .string({
        required_error: 'Model number is required!',
    })
        .optional(),
    category: zod_1.z
        .string({
        required_error: 'Product category is required!',
    })
        .optional(),
    connectivity: zod_1.z
        .string({
        required_error: 'Connectivity is required!',
    })
        .optional(),
    power_source: zod_1.z
        .string({
        required_error: 'Power source is required!',
    })
        .optional(),
    features: zod_1.z
        .string({
        required_error: 'Product features are required!',
    })
        .optional(),
});
exports.GadgetValidation = {
    createGadgetZodSchema,
    updateGadgetZodSchema,
};
