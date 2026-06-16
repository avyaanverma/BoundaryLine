import { StatusCodes } from "http-status-codes";
import AppError from "./AppError.js";

class Unauthorized extends AppError {
  constructor(message = "Unauthorized", details = null) {
    super(message, StatusCodes.UNAUTHORIZED, details);
  }
}

export default Unauthorized;
