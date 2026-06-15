import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import MatchService from "./match.service.js";

class MatchController {
  constructor(matchService = new MatchService()) {
    // What: receive the service dependency.
    // Why: controllers should translate HTTP data and leave business rules to services.
    // How: default to the real MatchService when no custom service is passed.
    this.matchService = matchService;
  }

  createMatch = asyncHandler(async (req, res) => {
    // What: handle POST /api/matches.
    // Why: admins need to create fixtures before scoring can begin.
    // How: pass validated body data to the service and return 201 Created.
    const match = await this.matchService.createMatch(req.validated.body);

    return new ApiResponse(201, "Match created successfully", match).send(res);
  });

  updateMatch = asyncHandler(async (req, res) => {
    // What: handle PATCH /api/matches/:id.
    // Why: admins need to update match metadata and initial status fields.
    // How: pass validated params/body to the service and return the updated record.
    const match = await this.matchService.updateMatch(
      req.validated.params.id,
      req.validated.body,
    );

    return new ApiResponse(200, "Match updated successfully", match).send(res);
  });

  deleteMatch = asyncHandler(async (req, res) => {
    // What: handle DELETE /api/matches/:id.
    // Why: admins need a safe remove action for incorrect fixtures.
    // How: soft-delete through the service and return the deleted record snapshot.
    const match = await this.matchService.deleteMatch(req.validated.params.id);

    return new ApiResponse(200, "Match deleted successfully", match).send(res);
  });
}

export default MatchController;
