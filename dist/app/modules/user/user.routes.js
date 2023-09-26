"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userRole_1 = require("../../../enum/userRole");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
// Define your routes here
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.allUsers);
router.get('/:id', (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.getSingleUser);
router.patch('/:id', (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUserByAdmin), user_controller_1.UserController.updateUser);
router.delete('/:id', (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
