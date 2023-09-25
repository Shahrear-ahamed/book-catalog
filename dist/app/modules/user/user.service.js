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
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const user_constants_1 = require("./user.constants");
const bcryptPass_1 = require("../../../utils/bcryptPass");
const allUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findMany({
        select: user_constants_1.selectOptions,
    });
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
        select: user_constants_1.selectOptions,
    });
});
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.password)
        data.password = yield bcryptPass_1.BcryptPassword.hashedPassword(data.password);
    console.log(data);
    return yield prisma_1.default.user.update({
        where: {
            id,
        },
        data,
        select: user_constants_1.selectOptions,
    });
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.delete({
        where: {
            id,
        },
        select: user_constants_1.selectOptions,
    });
});
exports.UserService = {
    allUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
