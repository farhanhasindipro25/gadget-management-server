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
exports.GadgetService = void 0;
const paginationHelper_1 = require("../../../common/helpers/paginationHelper");
const gadget_model_1 = require("./gadget.model");
const createGadget = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gadget_model_1.Gadget.create(payload);
    return result;
});
const getGadgetsList = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const gadgetsSearchableFields = ['product_title', 'brand', 'model_number'];
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: gadgetsSearchableFields.map(field => ({
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
    const result = yield gadget_model_1.Gadget.find(whereCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield gadget_model_1.Gadget.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getGadgetDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gadget_model_1.Gadget.findById(id);
    return result;
});
const updateGadgetDetails = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gadget_model_1.Gadget.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteGadget = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gadget_model_1.Gadget.findByIdAndDelete(id);
    return result;
});
const bulkDeleteGadgets = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    const gadgetsToDelete = yield gadget_model_1.Gadget.find({ _id: { $in: ids } });
    const deleteResult = yield gadget_model_1.Gadget.deleteMany({ _id: { $in: ids } });
    if (deleteResult.deletedCount && deleteResult.deletedCount > 0) {
        return gadgetsToDelete;
    }
    else {
        return [];
    }
});
exports.GadgetService = {
    createGadget,
    getGadgetsList,
    getGadgetDetails,
    updateGadgetDetails,
    deleteGadget,
    bulkDeleteGadgets,
};
