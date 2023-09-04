"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userRole_1 = require("../../../enum/userRole");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_controller_1 = require("./book.controller");
const book_validation_1 = require("./book.validation");
// Define your routes here
const router = express_1.default.Router();
router.post("/create-book", (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(book_validation_1.BookValidation.createNewBook), book_controller_1.BookController.createBook);
router.get("/", book_controller_1.BookController.getAllBooks);
router.get("/:categoryId/category", book_controller_1.BookController.getBookByCategoryId);
router.get("/:id", book_controller_1.BookController.getBookById);
router.patch("/:id", (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(book_validation_1.BookValidation.updateBook), book_controller_1.BookController.updateBookById);
router.delete("/:id", (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BookController.deleteBookById);
exports.BookRoutes = router;
