import { StatusCodes } from "http-status-codes";
import AppError from "./AppError.js";

class BadRequest extends AppError {
  constructor(message = "Bad request", details = null) {
    super(message, StatusCodes.BAD_REQUEST, details);
  }
}

export default BadRequest;
