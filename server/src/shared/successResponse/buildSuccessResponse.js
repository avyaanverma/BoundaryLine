export default class buildSuccessResponse {
  constructor(message, data = null, statusCode = 200) {
    this.success = true;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }
}
