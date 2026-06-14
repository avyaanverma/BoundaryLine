import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import ApiResponse from "../../shared/utils/ApiResponse.js";
import TeamService from "./team.service.js";

class TeamController {
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

  createTeam = asyncHandler(async (req, res) => {
    // What: handle POST /api/teams.
    // Why: admins need to register new cricket teams.
    // How: pass validated body data to the service and return 201 Created.
    const team = await this.teamService.createTeam(req.validated.body);

    return new ApiResponse(201, "Team created successfully", team).send(res);
  });

  updateTeam = asyncHandler(async (req, res) => {
    // What: handle PATCH /api/teams/:id.
    // Why: admins need to update team metadata without replacing the document.
    // How: pass validated params/body to the service and return the updated team.
    const team = await this.teamService.updateTeam(
      req.validated.params.id,
      req.validated.body,
    );

    return new ApiResponse(200, "Team updated successfully", team).send(res);
  });

  deleteTeam = asyncHandler(async (req, res) => {
    // What: handle DELETE /api/teams/:id.
    // Why: admins need a safe remove action that preserves historical references.
    // How: soft-delete through the service and return the deleted team snapshot.
    const team = await this.teamService.deleteTeam(req.validated.params.id);

    return new ApiResponse(200, "Team deleted successfully", team).send(res);
  });
}

export default TeamController;
