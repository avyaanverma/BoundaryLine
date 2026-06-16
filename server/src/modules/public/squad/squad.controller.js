import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import SquadService from "../../private/squad/squad.service.js";

class PublicSquadController {
  constructor(squadService = new SquadService()) {
    this.squadService = squadService;
  }

  listSquads = asyncHandler(async (_req, res) => {
    const squads = await this.squadService.getSquads();

    return new ApiResponse(200, "Squads fetched successfully", squads).send(res);
  });

  getSquad = asyncHandler(async (req, res) => {
    const squad = await this.squadService.getSquadById(req.validated.params.id);

    return new ApiResponse(200, "Squad fetched successfully", squad).send(res);
  });
}

export default PublicSquadController;
