import { StatusCodes } from "http-status-codes";
import ApiResponse from "../../shared/utils/ApiResponse.js";

  /**
   * @method GET
   * @route /health
   * @description to check the status of the server
   * */
export default class HealthController{
    CheckHealth(req, res){
        return new ApiResponse(StatusCodes.OK, "Working").send(res);
    }
}
