"use strict";
// Define your validations here
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const signUp = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
        contactNo: zod_1.z.string(),
        address: zod_1.z.string(),
        profileImg: zod_1.z.string().optional(),
    }),
});
const signIn = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
    }),
});
exports.AuthValidation = {
    signUp,
    signIn,
};
