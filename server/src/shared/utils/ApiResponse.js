export default class ApiResponse{
    constructor(statusCode, message="Success", payload){
        this.statusCode = statusCode;
        this.data = payload;
        this.message = message;
        this.success = statusCode < 400; 
    }

    send(res){
        return res
        .status(this.statusCode)
        .json({
            message: this.message,
            data: this.data,
            success:this.success
        })
    }
}