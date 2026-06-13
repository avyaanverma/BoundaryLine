import express from "express";
import googleOAuthMiddleware from "../../middlewares/googleOAuth.middleware";
import passport from "passport";

const router = express.Router();
// const authController = 
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
);

export default router;
