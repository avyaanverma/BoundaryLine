import { StatusCodes } from "http-status-codes";
import AppError from "./AppError.js";

class Conflict extends AppError {
  constructor(message = "Conflict", details = null) {
    super(message, StatusCodes.CONFLICT, details);
  }
}

export default Conflict;
