"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gadget = void 0;
const mongoose_1 = require("mongoose");
const gadgetSchema = new mongoose_1.Schema({
    product_title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
    },
    model_number: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    connectivity: {
        type: String,
        required: true,
    },
    power_source: {
        type: String,
        required: true,
    },
    features: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.Gadget = (0, mongoose_1.model)('Gadget', gadgetSchema);
