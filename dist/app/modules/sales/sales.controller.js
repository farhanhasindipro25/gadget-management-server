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
exports.SalesController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../common/helpers/catchAsync"));
const pick_1 = __importDefault(require("../../../common/helpers/pick"));
const sendResponse_1 = __importDefault(require("../../../common/helpers/sendResponse"));
const pagination_1 = require("../../../constants/pagination");
const sales_service_1 = require("./sales.service");
const createSale = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sale } = req.body;
    const result = yield sales_service_1.SalesService.createSale(sale);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Your sales has been recorded!',
        data: result,
        meta: {
            page: 0,
            limit: 0,
            total: 0,
        },
    });
}));
const getSalesHistory = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['searchTerm', 'createdAt']);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield sales_service_1.SalesService.getSalesHistory(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Sales history data retrieved',
        meta: result.meta,
        data: result.data,
    });
    next();
}));
const updateSaleDetails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield sales_service_1.SalesService.updateSaleDetails(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Buyer name information updated',
        data: result,
    });
}));
const deleteSale = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield sales_service_1.SalesService.deleteSale(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Sale record deleted!',
        data: result,
    });
}));
exports.SalesController = {
    createSale,
    getSalesHistory,
    updateSaleDetails,
    deleteSale,
};
