"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    user: zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
};
