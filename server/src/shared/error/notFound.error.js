import AppError from "./app.error.js";
import { StatusCodes } from "http-status-codes";

export default class NotFound extends AppError {
  constructor(message, details = "") {
    super(message, StatusCodes.NOT_FOUND, details);
  }
}