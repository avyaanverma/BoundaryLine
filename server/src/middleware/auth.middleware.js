import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import env from "../config/env.js";
import AppError from "../shared/error/AppError.js";

function getCookieValue(cookieHeader, cookieName) {
  // What: read one cookie value from the raw Cookie header.
  // Why: the app does not currently use cookie-parser, but auth accepts cookie tokens.
  // How: split the header into key/value pairs and decode the matching cookie.
  if (!cookieHeader) {
    return null;
  }

  const cookie = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${cookieName}=`));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.slice(cookieName.length + 1));
}

function getAccessToken(req) {
  // What: extract the access token from supported request locations.
  // Why: browser flows use cookies while API clients often use Bearer headers.
  // How: prefer Authorization Bearer, then fall back to the accessToken cookie.
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    const [scheme, token] = authorizationHeader.split(/\s+/);

    if (scheme?.toLowerCase() === "bearer" && token) {
      return token.trim();
    }
  }

  return getCookieValue(req.headers.cookie, "accessToken");
}

export function authenticateRequest(req, _res, next) {
  // What: verify a JWT access token and attach its payload to the request.
  // Why: write APIs need a trusted user identity before mutating data.
  // How: verify with ACCESS_TOKEN_SECRET and forward auth failures as 401 errors.
  const token = getAccessToken(req);

  if (!token) {
    next(new AppError("Access token is required", StatusCodes.UNAUTHORIZED));
    return;
  }

  try {
    req.user = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
    next();
  } catch (_error) {
    next(new AppError("Invalid or expired access token", StatusCodes.UNAUTHORIZED));
  }
}

export function authorizeRoles(allowedRoles = []) {
  // What: build middleware that checks the authenticated user's role.
  // Why: authenticated users should only access operations allowed for their role.
  // How: compare req.user.role with the supplied allow-list.
  return function authorizeRolesMiddleware(req, _res, next) {
    if (!req.user?.role) {
      next(new AppError("Authenticated user role is required", StatusCodes.UNAUTHORIZED));
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      next(new AppError("User role is not allowed for this operation", StatusCodes.FORBIDDEN));
      return;
    }

    next();
  };
}

export const authenticate = authenticateRequest;

export function authorize(...allowedRoles) {
  // What: preserve the shorter upstream middleware API.
  // Why: new route modules may import `authorize("ADMIN")` instead of `authorizeRoles([...])`.
  // How: adapt the variadic arguments to the shared role-authorizer.
  return authorizeRoles(allowedRoles);
}

export const authMiddleware = authenticateRequest;

export function authorizationMiddleware(roles = []) {
  // What: preserve the upstream auth middleware name.
  // Why: some newer modules import `authorizationMiddleware` instead of `authorizeRoles`.
  // How: normalize a single role or role array to the shared role authorizer.
  return authorizeRoles(Array.isArray(roles) ? roles : [roles]);
}
