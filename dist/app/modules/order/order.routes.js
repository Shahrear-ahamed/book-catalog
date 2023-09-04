"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userRole_1 = require("../../../enum/userRole");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_controller_1 = require("./order.controller");
const order_validation_1 = require("./order.validation");
// Define your routes here
const router = express_1.default.Router();
router.post("/create-order", (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.CUSTOMER), (0, validateRequest_1.default)(order_validation_1.OrderValidation.createOrder), order_controller_1.OrderController.createOrder);
router.get("/", (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN, userRole_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.OrderController.getOrders);
// bonus part
router.get("/:orderId", (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN, userRole_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.OrderController.getOrderById);
exports.OrderRoutes = router;
