"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sales = void 0;
const mongoose_1 = require("mongoose");
const salesSchema = new mongoose_1.Schema({
    buyer_name: {
        type: String,
        required: true,
    },
    sale: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Gadget',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Sales = (0, mongoose_1.model)('Sales', salesSchema);
