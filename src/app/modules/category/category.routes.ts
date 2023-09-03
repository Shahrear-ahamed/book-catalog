import express from "express";
import { ENUM_USER_ROLE } from "../../../enum/userRole";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryController } from "./category.controller";
import { CategoryValidation } from "./category.validation";

// Define your routes here
const router = express.Router();

router.post(
  "/create-category",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.createCategoryValidation),
  CategoryController.createCategory
);

router.get("/", CategoryController.getAllCategories);

router.get("/:id", CategoryController.getSingleCategory);

router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.createCategoryValidation),
  CategoryController.updateCategory
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteCategory
);

export const CategoryRoutes = router;
