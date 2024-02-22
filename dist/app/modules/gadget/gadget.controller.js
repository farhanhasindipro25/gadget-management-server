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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GadgetController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../common/helpers/catchAsync"));
const pick_1 = __importDefault(require("../../../common/helpers/pick"));
const sendResponse_1 = __importDefault(require("../../../common/helpers/sendResponse"));
const pagination_1 = require("../../../constants/pagination");
const gadget_service_1 = require("./gadget.service");
const createGadget = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gadget } = req.body;
    const result = yield gadget_service_1.GadgetService.createGadget(gadget);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'New gadget has been added!',
        data: result,
        meta: {
            page: 0,
            limit: 0,
            total: 0,
        },
    });
}));
const getGadgetsList = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, [
        'searchTerm',
        'price',
        'category',
        'connectivity',
        'power_source',
        'features',
    ]);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield gadget_service_1.GadgetService.getGadgetsList(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All gadget data retrieved',
        meta: result.meta,
        data: result.data,
    });
    next();
}));
const getGadgetDetails = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield gadget_service_1.GadgetService.getGadgetDetails(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Gadget details data retrieved',
        data: result,
    });
    next();
}));
const updateGadgetDetails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield gadget_service_1.GadgetService.updateGadgetDetails(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Gadget information updated!',
        data: result,
    });
}));
const deleteGadget = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield gadget_service_1.GadgetService.deleteGadget(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Gadget deleted successfully!',
        data: result,
    });
}));
const bulkDeleteGadgets = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: 'Invalid or empty array of gadget IDs',
        });
    }
    const result = yield gadget_service_1.GadgetService.bulkDeleteGadgets(ids);
    if (result && result.length > 0) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Gadgets deleted successfully!',
            data: result,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: 'No gadgets found with the provided IDs.',
        });
    }
}));
exports.GadgetController = {
    createGadget,
    getGadgetsList,
    getGadgetDetails,
    updateGadgetDetails,
    deleteGadget,
    bulkDeleteGadgets,
};
