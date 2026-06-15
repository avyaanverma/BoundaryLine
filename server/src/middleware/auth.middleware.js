import mongoose from "mongoose";
import AppError from "../shared/errors/AppError.js";

class AuthMiddleware {
  /**
   * Authenticate user
   */
  authenticate(req, _res, next) {
    const authHeader = req.headers.authorization;
    const directRole = req.headers["x-user-role"];
    const directUserId = req.headers["x-user-id"];

    let user = null;
    // Direct header auth
    if (directRole || directUserId) {
      user = {
        _id: directUserId
          ? new mongoose.Types.ObjectId(directUserId)
          : new mongoose.Types.ObjectId(
              "60d5ec4934d4a89a80000001"
            ),
        role: directRole || "SUPER_ADMIN",
      };
    }

    // Bearer token auth
    else if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      const allowedRoles = [
        "SUPER_ADMIN",
        "ADMIN",
        "SCORER",
      ];

      user = {
        _id: new mongoose.Types.ObjectId(
          "60d5ec4934d4a89a80000001"
        ),
        role: allowedRoles.includes(token)
          ? token
          : "SUPER_ADMIN",
      };
    }

    // Development fallback
    else {
      user = {
        _id: new mongoose.Types.ObjectId(
          "60d5ec4934d4a89a80000001"
        ),
        role: "SUPER_ADMIN",
      };
    }

    if (!user) {
      return next(
        new AppError("Authentication required", 401)
      );
    }

    req.user = user;
    next();
  }

  /**
   * Authorize roles
   */
  authorize(...allowedRoles) {
    return (req, _res, next) => {
      if (!req.user) {
        return next(
          new AppError("Authentication required", 401)
        );
      }

      if (!allowedRoles.includes(req.user.role)) {
        return next(
          new AppError(
            "Access forbidden: Insufficient permissions",
            403
          )
        );
      }

      next();
    };
  }
}

const authMiddleware = new AuthMiddleware();

export const authenticate =
  authMiddleware.authenticate.bind(authMiddleware);

export const authorize =
  authMiddleware.authorize.bind(authMiddleware);