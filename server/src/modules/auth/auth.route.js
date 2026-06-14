import express from "express";
import googleOAuthMiddleware from "../../middleware/googleOAuth.middleware.js";
import passport from "passport";
import AuthController from "./auth.controller.js";

const router = express.Router();
const authController = new AuthController();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.GoogleCallback.bind(authController),
);

export default router;