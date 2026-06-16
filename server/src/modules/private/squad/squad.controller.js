import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import SquadService from "./squad.service.js";

class SquadController {
  constructor(squadService = new SquadService()) {
    this.squadService = squadService;
  }

  createSquad = asyncHandler(async (req, res) => {
    const squad = await this.squadService.createSquad(req.validated.body);

    return new ApiResponse(201, "Squad created successfully", squad).send(res);
  });

  updateSquad = asyncHandler(async (req, res) => {
    const squad = await this.squadService.updateSquad(
      req.validated.params.id,
      req.validated.body,
    );

    return new ApiResponse(200, "Squad updated successfully", squad).send(res);
  });

  deleteSquad = asyncHandler(async (req, res) => {
    const squad = await this.squadService.deleteSquad(req.validated.params.id);

    return new ApiResponse(200, "Squad deleted successfully", squad).send(res);
  });
}

export default SquadController;
