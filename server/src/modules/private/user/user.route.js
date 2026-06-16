import express from "express";

import UserController from "./user.controller.js";

import {
  authMiddleware,
  authorizationMiddleware,
} from "../../../middleware/auth.middleware.js";

import { ROLES } from "../../../constant/role.constant.js";

const router = express.Router();

const userController = new UserController();

router.get(
  "/me",
  authMiddleware,
  userController.getCurrentUser
);

router.patch(
  "/me",
  authMiddleware,
  userController.updateCurrentUser
);

router.get(
  "/",
  authMiddleware,
  authorizationMiddleware([
    ROLES.ADMIN,
    ROLES.SUPER_ADMIN,
  ]),
  userController.listUsers
);

router.delete(
  "/:id",
  authMiddleware,
  authorizationMiddleware([
    ROLES.ADMIN,
    ROLES.SUPER_ADMIN,
  ]),
  userController.deleteUser
);

export default router;