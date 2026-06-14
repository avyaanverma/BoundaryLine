// base ERROR class
class AppError extends Error {
  constructor(message, statusCode, name) {
    super(message);
    this.name = name;
    this.statuscode = statusCode;
    Error.captureStackTrace(this, this.constructor); //thi maintains the proper stack trace
  }
}
// 400(bad request) invalid input ya request data ke liye
export class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400, "BadRequestError");
  }
}
// 401(unauthorizederror)when a user is not logged in
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, "UnauthorizedError");
  }
}
// 403(ForbiddenError) when a user is logged in but permission nai hai. Eg: Scorer login ho jayega but usko as runs me changes karne ka chance nai milega 
export class ForbiddenError extends AppError {
  constructor(message = "Forbideen") {
    super(message, 404, "ForbiddenError");
  }
}
// 404(Not Found Error) requested data routes are not found 
export class NotFoundError extends AppError {
  constructor(message = "Resource Not Found") {
    super(message, 404, "NotFoundError");
  }
}
