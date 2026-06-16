import { StatusCodes } from "http-status-codes";
import NotFound from "../shared/error/NotFound.js";

export function notFoundHandler(req, _res, next) {
  // What: convert unmatched requests into a consistent application error.
  // Why: unknown routes should return JSON instead of Express's default HTML.
  // How: forward a 404 AppError into the global error handler.
  next(new NotFound(`Route not found: ${req.originalUrl}`));
}

export function errorHandler(error, _req, res, _next) {
  // What: normalize any thrown error into a JSON response.
  // Why: clients need predictable `{ success, message }` responses for failures.
  // How: prefer AppError fields, otherwise fall back to 500 Internal Server Error.
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const isOperational = error.isOperational === true;
  const message = isOperational ? error.message : "Internal server error";
  const details = isOperational && error.details ? error.details : null;

  if (!isOperational) {
    console.error(error);
  }

  res.status(statusCode).json({
    message,
    ...(details ? { details } : {}),
    success: false,
  });
}
