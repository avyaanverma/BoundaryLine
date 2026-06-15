import jwt from "jsonwebtoken";
import env from "../config/env.js";
import { asyncHandler } from "../shared/utils/asyncHandler.js";
import NotFound from "../shared/error/notFound.error.js";
import unAuthorizeError from "../shared/error/unAuthroize.error.js";

export const authMiddleware = asyncHandler((req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) throw new NotFound("Token not found");
  const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
  if (!payload)
    throw new unAuthorizeError(
      "UnAuthorized user",
      "Token verification failed.",
    );
  req.user = payload;

  next();
});

// Role based access Middleware
export const authorizationMiddleware = asyncHandler((role) => {
  return (req, res, next) => {
    if (role.includes(req.user.role)) {
      next();
    } else {
      throw new unAuthorizeError("UnAuthorized user", "Invalid Role");
    }
  };
});
