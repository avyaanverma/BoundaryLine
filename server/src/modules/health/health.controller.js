  /**
   * @method GET
   * @route /health
   * @description to check the status of the server
   * */
export default class HealthController{
    CheckHealth(req, res){
        res.status(200).json({
            message: "healthy"
        })
    }
}