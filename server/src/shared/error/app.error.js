// Parent Class
export default class AppError extends Error{
    constructor(message, statusCodes, details = ""){
        super(message);
        this.statusCodes = statusCodes;
        this.details = details;
        this.name = "AppError";
    }
}
