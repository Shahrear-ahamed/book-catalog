import express from "express";
import { AuthController } from "./auth.controller";

// Define your routes here
const router = express.Router();

router.post("/signup", AuthController.signUp);

router.post("/signin", AuthController.signIn);

export const AuthRoutes = router;
