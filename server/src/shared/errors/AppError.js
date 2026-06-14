class AppError extends Error {
  constructor(message, statusCode = 500, details = null) {
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

  static badRequest(message, details = null) {
    // What: create a 400 error for invalid client input.
    // Why: validation and business-rule failures should not look like server crashes.
    // How: return an AppError with HTTP 400 and optional details.
    return new AppError(message, 400, details);
  }

  static notFound(message = "Resource not found") {
    // What: create a 404 error for missing database records or routes.
    // Why: callers need a clear response when an entity does not exist.
    // How: return an AppError with HTTP 404.
    return new AppError(message, 404);
  }

  static conflict(message, details = null) {
    // What: create a 409 error for duplicate or conflicting state.
    // Why: uniqueness checks are business conflicts, not generic bad requests.
    // How: return an AppError with HTTP 409 and optional details.
    return new AppError(message, 409, details);
  }
}

export default AppError;
