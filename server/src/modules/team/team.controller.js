import { asyncHandler } from "../../shared/utils/asyncHandler.js";
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

    res.json({
      success: true,
      data: teams,
    });
  });

  getTeam = asyncHandler(async (req, res) => {
    // What: handle GET /api/teams/:id.
    // Why: detail views and dependent workflows need one specific team.
    // How: read the validated route id and ask the service for the team.
    const team = await this.teamService.getTeamById(req.validated.params.id);

    res.json({
      success: true,
      data: team,
    });
  });

  createTeam = asyncHandler(async (req, res) => {
    // What: handle POST /api/teams.
    // Why: admins need to register new cricket teams.
    // How: pass validated body data to the service and return 201 Created.
    const team = await this.teamService.createTeam(req.validated.body);

    res.status(201).json({
      success: true,
      data: team,
    });
  });

  updateTeam = asyncHandler(async (req, res) => {
    // What: handle PATCH /api/teams/:id.
    // Why: admins need to update team metadata without replacing the document.
    // How: pass validated params/body to the service and return the updated team.
    const team = await this.teamService.updateTeam(
      req.validated.params.id,
      req.validated.body,
    );

    res.json({
      success: true,
      data: team,
    });
  });

  deleteTeam = asyncHandler(async (req, res) => {
    // What: handle DELETE /api/teams/:id.
    // Why: admins need a safe remove action that preserves historical references.
    // How: soft-delete through the service and return the deleted team snapshot.
    const team = await this.teamService.deleteTeam(req.validated.params.id);

    res.json({
      success: true,
      data: team,
    });
  });
}

export default TeamController;
