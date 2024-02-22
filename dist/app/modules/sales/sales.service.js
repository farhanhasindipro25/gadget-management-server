"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesService = void 0;
const paginationHelper_1 = require("../../../common/helpers/paginationHelper");
const sales_model_1 = require("./sales.model");
const createSale = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield sales_model_1.Sales.create(payload)).populate('sale');
    return result;
});
const getSalesHistory = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const salesSearchableFields = [
        'product_title',
        'buyer_name',
        'brand',
        'model_number',
    ];
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: salesSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filterData).length) {
        andConditions.push({
            $and: Object.entries(filterData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield sales_model_1.Sales.find(whereCondition)
        .populate('sale')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield sales_model_1.Sales.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateSaleDetails = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sales_model_1.Sales.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate('sale');
    return result;
});
const deleteSale = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sales_model_1.Sales.findByIdAndDelete(id);
    return result;
});
exports.SalesService = {
    createSale,
    getSalesHistory,
    updateSaleDetails,
    deleteSale,
};
