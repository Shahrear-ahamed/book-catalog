import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";

const routers = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => {});

export default routers;
