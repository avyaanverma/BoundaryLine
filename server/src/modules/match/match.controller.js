import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import MatchService from "./match.service.js";

class MatchController {
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

    res.json({
      success: true,
      data: matches,
    });
  });

  getMatch = asyncHandler(async (req, res) => {
    // What: handle GET /api/matches/:id.
    // Why: match detail views need one exact match record.
    // How: read the validated id from params and call the service.
    const match = await this.matchService.getMatchById(req.validated.params.id);

    res.json({
      success: true,
      data: match,
    });
  });

  createMatch = asyncHandler(async (req, res) => {
    // What: handle POST /api/matches.
    // Why: admins need to create fixtures before scoring can begin.
    // How: pass validated body data to the service and return 201 Created.
    const match = await this.matchService.createMatch(req.validated.body);

    res.status(201).json({
      success: true,
      data: match,
    });
  });

  updateMatch = asyncHandler(async (req, res) => {
    // What: handle PATCH /api/matches/:id.
    // Why: admins need to update match metadata and initial status fields.
    // How: pass validated params/body to the service and return the updated record.
    const match = await this.matchService.updateMatch(
      req.validated.params.id,
      req.validated.body,
    );

    res.json({
      success: true,
      data: match,
    });
  });

  deleteMatch = asyncHandler(async (req, res) => {
    // What: handle DELETE /api/matches/:id.
    // Why: admins need a safe remove action for incorrect fixtures.
    // How: soft-delete through the service and return the deleted record snapshot.
    const match = await this.matchService.deleteMatch(req.validated.params.id);

    res.json({
      success: true,
      data: match,
    });
  });
}

export default MatchController;
