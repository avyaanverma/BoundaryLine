import express from "express";
import passport from "passport";
import AuthController from "./auth.controller.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";

const router = express.Router();
const authController = new AuthController();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
);

// for development not for production
router.patch(
  "/make-admin",
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

router.post(
  "/register",
  asyncHandler(authController.registerController.bind(authController)),
);

router.post(
  "/login",
  asyncHandler(authController.loginController.bind(authController)),
);

export default router;
