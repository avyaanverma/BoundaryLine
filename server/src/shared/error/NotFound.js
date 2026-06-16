import { StatusCodes } from "http-status-codes";
import AppError from "./AppError.js";

class NotFound extends AppError {
  constructor(message = "Resource not found", details = null) {
    super(message, StatusCodes.NOT_FOUND, details);
  }
}

export default NotFound;
