"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectOptions = exports.userRole = void 0;
const userRole_1 = require("../../../enum/userRole");
// Define your constants here
exports.userRole = [userRole_1.ENUM_USER_ROLE.ADMIN, userRole_1.ENUM_USER_ROLE.CUSTOMER];
exports.selectOptions = {
    id: true,
    name: true,
    email: true,
    role: true,
    contactNo: true,
    address: true,
    profileImg: true,
    createdAt: true,
    updatedAt: true,
};
