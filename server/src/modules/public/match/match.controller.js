import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import MatchService from "../../private/match/match.service.js";

class PublicMatchController {
  constructor(matchService = new MatchService()) {
    // What: receive the service dependency.
    // Why: controllers should translate HTTP data and leave business rules to services.
    // How: default to the real MatchService when no custom service is passed.
    this.matchService = matchService;
  }

  listMatches = asyncHandler(async (_req, res) => {
    // What: handle GET /api/matches.
    // Why: admin pages need a list of current fixtures and matches.
    // How: call the service and return a consistent success response.
    const matches = await this.matchService.listMatches();

    return new ApiResponse(200, "Matches fetched successfully", matches).send(res);
  });

  getMatch = asyncHandler(async (req, res) => {
    // What: handle GET /api/matches/:id.
    // Why: match detail views need one exact match record.
    // How: read the validated id from params and call the service.
    const match = await this.matchService.getMatchById(req.validated.params.id);

    return new ApiResponse(200, "Match fetched successfully", match).send(res);
  });
}

export default PublicMatchController;
