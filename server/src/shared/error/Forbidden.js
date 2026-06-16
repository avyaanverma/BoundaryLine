import { StatusCodes } from "http-status-codes";
import AppError from "./AppError.js";

class Forbidden extends AppError {
  constructor(message = "Forbidden", details = null) {
    super(message, StatusCodes.FORBIDDEN, details);
  }
}

export default Forbidden;
