import { Router } from "express";
import UserController from "./user.controller.js";
import { validateRequest } from "../../../middleware/validateRequest.js";

import {
  authenticateRequest,
  authorizeRoles,
} from "../../../middleware/auth.middleware.js";

import { ROLES } from "../../../constant/role.constant.js";

import {
  createUserSchema,
  updateUserRoleSchema,
  userIdParamSchema,
  userQuerySchema,
} from "../../../validators/user.validator.js";

class UserRoute {
  constructor(userController = new UserController()) {
    this.router = Router();
    this.userController = userController;

    this.registerRoutes();
  }

  registerRoutes() {
    const adminOnly = [
      authenticateRequest,
      authorizeRoles([ROLES.ADMIN, ROLES.SUPER_ADMIN]),
    ];

    // Create User
    this.router.post(
      "/",
      ...adminOnly,
      validateRequest(createUserSchema),
      this.userController.createUser,
    );

    // Get All Users
    this.router.get(
      "/",
      ...adminOnly,
      validateRequest(userQuerySchema),
      this.userController.getAllUsers,
    );

    // Get User By Id
    this.router.get(
      "/:id",
      ...adminOnly,
      validateRequest(userIdParamSchema),
      this.userController.getUserById,
    );

    // Update User Role
    this.router.patch(
      "/:id/role",
      ...adminOnly,
      validateRequest(updateUserRoleSchema),
      this.userController.updateUserRole,
    );

    // Soft Delete User
    this.router.delete(
      "/:id",
      ...adminOnly,
      validateRequest(userIdParamSchema),
      this.userController.deleteUser,
    );
  }

  getRouter() {
    return this.router;
  }
}

const userRoute = new UserRoute();

export default userRoute.getRouter();
