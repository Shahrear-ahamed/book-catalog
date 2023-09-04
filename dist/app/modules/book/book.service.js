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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../utils/paginationHelper");
const book_constants_1 = require("./book.constants");
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.book.create({
        data: payload,
    });
});
const getAllBooks = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm, maxPrice, minPrice, categoryId } = filters;
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            OR: book_constants_1.AllBooksSearchableFields.map((filter) => ({
                [filter]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (categoryId) {
        andCondition.push({
            categoryId,
        });
    }
    if (maxPrice) {
        andCondition.push({
            price: {
                lte: Number(maxPrice),
            },
        });
    }
    if (minPrice) {
        andCondition.push({
            price: {
                gte: Number(minPrice),
            },
        });
    }
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
    // get data
    const result = yield prisma_1.default.book.findMany({
        where: whereCondition,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: "desc",
            },
    });
    // total count
    const total = yield prisma_1.default.book.count();
    return {
        meta: {
            total,
            page,
            size,
            totalPage: Math.ceil(total / size),
        },
        data: result,
    };
});
const getBookByCategoryId = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.book.findMany({
        where: {
            categoryId,
        },
    });
});
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
    });
});
const updateBookById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.book.update({
        where: {
            id,
        },
        data: payload,
    });
});
const deleteBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.book.delete({
        where: {
            id,
        },
    });
});
exports.BookService = {
    createBook,
    getAllBooks,
    getBookByCategoryId,
    getBookById,
    updateBookById,
    deleteBookById,
};
