import mongoose from "mongoose";
import AppError from "../shared/errors/AppError.js";

class AuthMiddleware {
  authenticate(req, _res, next) {
    const authHeader = req.headers.authorization;
    const directRole = req.headers["x-user-role"];
    const directUserId = req.headers["x-user-id"];

    let user = null;

    // Allow header auth only in development
    const allowHeaderAuth = process.env.NODE_ENV === "development";

    // Allowed roles
    const allowedRoles = ["SUPER_ADMIN", "ADMIN", "SCORER"];

    // Header-based auth (development only)
    if (allowHeaderAuth && (directRole || directUserId)) {
      // Validate role
      if (directRole && !allowedRoles.includes(directRole)) {
        return next(new AppError("Invalid role", 400));
      }

      // Validate ObjectId
      if (directUserId && !mongoose.Types.ObjectId.isValid(directUserId)) {
        return next(new AppError("Invalid user ID", 400));
      }

      user = {
        _id: directUserId
          ? new mongoose.Types.ObjectId(directUserId)
          : new mongoose.Types.ObjectId("60d5ec4934d4a89a80000001"),
        role: directRole || "ADMIN",
      };
    }

    // Bearer token auth
    else if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];

      if (!allowedRoles.includes(token)) {
        return next(new AppError("Invalid authentication token", 401));
      }

      user = {
        _id: new mongoose.Types.ObjectId("60d5ec4934d4a89a80000001"),
        role: token,
      };
    }

    // No auth
    else {
      return next(new AppError("Authentication required", 401));
    }

    req.user = user;
    next();
  }

  authorize(...allowedRoles) {
    return (req, _res, next) => {
      if (!req.user) {
        return next(new AppError("Authentication required", 401));
      }

      if (!allowedRoles.includes(req.user.role)) {
        return next(
          new AppError("Access forbidden: Insufficient permissions", 403),
        );
      }

      next();
    };
  }
}

const authMiddleware = new AuthMiddleware();

export const authenticate = authMiddleware.authenticate.bind(authMiddleware);

export const authorize = authMiddleware.authorize.bind(authMiddleware);
