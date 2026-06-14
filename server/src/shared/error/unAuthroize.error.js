import { StatusCodes } from "http-status-codes";

export default class unAuthorizeError extends AppError{
    constructor(message, details=""){
        super(message, StatusCodes.UNAUTHORIZED, details);
    }
} 