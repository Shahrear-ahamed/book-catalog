"use strict";
// Your service code here
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const userRole_1 = require("../../../enum/userRole");
const createOrder = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    payload.userId = userId;
    const { orderedBooks } = payload, others = __rest(payload, ["orderedBooks"]);
    const newOrder = yield prisma_1.default.$transaction((prismaTrans) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield prismaTrans.order.create({
            data: others,
        });
        if (!order) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to create orders');
        }
        if (orderedBooks && orderedBooks.length > 0) {
            const orderBookItems = orderedBooks.map(item => {
                return {
                    bookId: item.bookId,
                    quantity: item.quantity,
                    orderId: order.id,
                };
            });
            for (let i = 0; i < orderBookItems.length; i++) {
                yield prismaTrans.orderedBook.create({
                    data: orderBookItems[i],
                });
            }
        }
        return order;
    }));
    if (!newOrder)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to create your order');
    return yield prisma_1.default.order.findFirst({
        where: {
            id: newOrder.id,
        },
        include: {
            orderedBooks: true,
        },
    });
});
const getOrders = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if ((user === null || user === void 0 ? void 0 : user.role) === userRole_1.ENUM_USER_ROLE.ADMIN) {
        return yield prisma_1.default.order.findMany({
            include: {
                orderedBooks: true,
            },
        });
    }
    return yield prisma_1.default.order.findMany({
        where: {
            userId: user === null || user === void 0 ? void 0 : user.id,
        },
        include: {
            orderedBooks: true,
        },
    });
});
// bonus part
const getOrderById = (orderId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const condition = (user === null || user === void 0 ? void 0 : user.role) === userRole_1.ENUM_USER_ROLE.ADMIN
        ? { id: orderId }
        : { id: orderId, userId: user === null || user === void 0 ? void 0 : user.id };
    return yield prisma_1.default.order.findFirst({
        where: {
            AND: [condition],
        },
        include: {
            orderedBooks: true,
        },
    });
});
exports.OrderService = {
    createOrder,
    getOrders,
    getOrderById,
};
