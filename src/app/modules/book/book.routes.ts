import express from "express";
import { ENUM_USER_ROLE } from "../../../enum/userRole";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BookController } from "./book.controller";
import { BookValidation } from "./book.validation";

// Define your routes here
const router = express.Router();

router.post(
  "/create-book",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.createNewBook),
  BookController.createBook
);

router.get("/", BookController.getAllBooks);

router.get("/:categoryId/category", BookController.getBookByCategoryId);

router.get("/:id", BookController.getBookById);

router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.updateBook),
  BookController.updateBookById
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.deleteBookById
);

export const BookRoutes = router;
