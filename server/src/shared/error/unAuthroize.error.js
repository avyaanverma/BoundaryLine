import { StatusCodes } from "http-status-codes";
import AppError from "./AppError.js";

class unAuthorize extends AppError {
  constructor(message = "Unauthorized Resource", details = null) {
    super(message, StatusCodes.UNAUTHORIZED, details);
  }
}

export default unAuthorize;
