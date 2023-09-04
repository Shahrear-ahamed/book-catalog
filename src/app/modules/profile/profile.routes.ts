import express from "express";
import { ENUM_USER_ROLE } from "../../../enum/userRole";
import auth from "../../middlewares/auth";
import { ProfileController } from "./profile.controller";

// Define your routes here
const router = express.Router();

router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  ProfileController.getProfile
);

export const ProfileRoutes = router;
