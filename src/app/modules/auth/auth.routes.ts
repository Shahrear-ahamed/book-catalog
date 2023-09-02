import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

// Define your routes here
const router = express.Router();

router.post(
  "/signup",
  validateRequest(AuthValidation.signUp),
  AuthController.signUp
);

router.post(
  "/signin",
  validateRequest(AuthValidation.signIn),
  AuthController.signIn
);

export const AuthRoutes = router;
