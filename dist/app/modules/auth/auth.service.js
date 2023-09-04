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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bcryptPass_1 = require("../../../utils/bcryptPass");
const token_1 = require("../../../utils/token");
const signUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.password = yield bcryptPass_1.BcryptPassword.hashedPassword(payload.password);
    return yield prisma_1.default.user.create({
        data: payload,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
            createdAt: true,
            updatedAt: true,
        },
    });
});
const signIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const compared = yield bcryptPass_1.BcryptPassword.comparePassword(payload.password, isExist.password);
    if (!compared) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, "email or password is wrong");
    }
    const userTokenData = {
        id: isExist.id,
        role: isExist.role,
    };
    const token = yield token_1.TokenServices.generateToken(userTokenData);
    return {
        token,
    };
});
exports.AuthService = { signUp, signIn };