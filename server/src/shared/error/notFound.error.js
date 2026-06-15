import AppError from "./AppError.js";
import { StatusCodes } from "http-status-codes";

export default class NotFound extends AppError {
  constructor(message, details = "") {
    super(message, StatusCodes.NOT_FOUND, details);
  }
}