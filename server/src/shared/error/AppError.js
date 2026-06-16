import { StatusCodes } from "http-status-codes";

class AppError extends Error {
  constructor(message, statusCode = StatusCodes.INTERNAL_SERVER_ERROR, details = null) {
    // What: build the base Error with the message that controllers/services will expose.
    // Why: native Error keeps stack traces useful while AppError adds HTTP response data.
    // How: call super first, then attach status code, details, and operational marker.
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;

    // What: keep stack traces focused on the original caller.
    // Why: debugging is easier when the constructor frame is hidden.
    // How: capture the stack trace when the runtime supports it.
    Error.captureStackTrace?.(this, this.constructor);
  }
}

export default AppError;
