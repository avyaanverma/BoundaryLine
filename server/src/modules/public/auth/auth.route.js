import express from "express";
import passport from "passport";
import AuthController from "./auth.controller.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import { validateRequest } from "../../../middleware/validateRequest.js";
import { makeAdminSchema, registerSchema } from "./auth.validator.js";
import {
  authMiddleware,
  authenticateRequest,
  authorizeRoles,
} from "../../../middleware/auth.middleware.js";
import { ROLES } from "../../../constant/role.constant.js";

const router = express.Router();
const authController = new AuthController();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
);

router.patch(
  "/make-admin",
  authenticateRequest,
  authorizeRoles([ROLES.SUPER_ADMIN]),
  validateRequest(makeAdminSchema),
  asyncHandler(authController.makeAdmin.bind(authController)),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  authController.GoogleCallback.bind(authController),
);

router.get(
  "/refreshToken",
  asyncHandler(authController.refreshAccessToken.bind(authController)),
);

router.post(
  "/register",
  validateRequest(registerSchema),
  asyncHandler(authController.registerController.bind(authController)),
);

router.post(
  "/login",
  asyncHandler(authController.loginController.bind(authController)),
);

router.get(
  "/me",
  authMiddleware,
  asyncHandler(authController.getMe.bind(authController)),
);
export default router;
