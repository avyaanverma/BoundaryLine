import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import TeamService from "../../private/team/team.service.js";

class PublicTeamController {
  constructor(teamService = new TeamService()) {
    // What: receive the service dependency.
    // Why: controllers should coordinate HTTP only and delegate business rules.
    // How: default to the real TeamService for normal runtime usage.
    this.teamService = teamService;
  }

  listTeams = asyncHandler(async (_req, res) => {
    // What: handle GET /api/teams.
    // Why: frontend pages need an active team directory.
    // How: call the service and wrap the result in a consistent success response.
    const teams = await this.teamService.listTeams();

    return new ApiResponse(200, "Teams fetched successfully", teams).send(res);
  });

  getTeam = asyncHandler(async (req, res) => {
    // What: handle GET /api/teams/:id.
    // Why: detail views and dependent workflows need one specific team.
    // How: read the validated route id and ask the service for the team.
    const team = await this.teamService.getTeamById(req.validated.params.id);

    return new ApiResponse(200, "Team fetched successfully", team).send(res);
  });
}

export default PublicTeamController;
