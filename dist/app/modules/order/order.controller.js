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
exports.OrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_service_1 = require("./order.service");
// Your controller code here
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield order_service_1.OrderService.createOrder(req.body, user === null || user === void 0 ? void 0 : user.id);
    (0, sendResponse_1.default)(res, {
        message: 'Order created successfully',
        data: result,
        success: true,
        statusCode: http_status_1.default.OK,
    });
}));
const getOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield order_service_1.OrderService.getOrders(user);
    (0, sendResponse_1.default)(res, {
        message: 'Orders retrieved successfully',
        data: result,
        success: true,
        statusCode: http_status_1.default.OK,
    });
}));
// bonus part
const getOrderById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield order_service_1.OrderService.getOrderById(req.params.orderId, user);
    (0, sendResponse_1.default)(res, {
        message: 'Order fetched successfully',
        data: result,
        success: true,
        statusCode: http_status_1.default.OK,
    });
}));
exports.OrderController = {
    createOrder,
    getOrders,
    getOrderById,
};
