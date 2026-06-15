import Conflict from "../../shared/error/Conflict.js";
import NotFound from "../../shared/error/NotFound.js";
import TeamRepository from "../../repository/team.repository.js";

class TeamService {
  constructor(teamRepository = new TeamRepository()) {
    // What: receive the repository dependency.
    // Why: constructor injection makes service logic easier to test later.
    // How: default to the real TeamRepository when no custom repository is passed.
    this.teamRepository = teamRepository;
  }

  async listTeams() {
    // What: return every active team.
    // Why: admin/frontend screens need a simple team directory endpoint.
    // How: delegate database access to the repository class.
    return this.teamRepository.findAll();
  }

  async getTeamById(teamId) {
    // What: return one active team by id.
    // Why: detail screens and dependent modules need a precise lookup.
    // How: fetch through repository and throw 404 if not found.
    const team = await this.teamRepository.findById(teamId);

    if (!team) {
      // What: stop the request when the team does not exist.
      // Why: controllers should return a clear 404 response instead of null data.
      // How: throw a shared AppError consumed by error middleware.
      throw new NotFound("Team not found");
    }

    return team;
  }

  async createTeam(payload) {
    // What: create a team after checking identity uniqueness.
    // Why: duplicate team names or short codes break selectors and scoreboards.
    // How: check the validated payload, then let the schema handle persistence transforms.
    await this.ensureUniqueTeam(payload.name, payload.shortName);

    return this.teamRepository.create(payload);
  }

  async updateTeam(teamId, payload) {
    // What: update team fields safely.
    // Why: partial edits should not create duplicate team names or short codes.
    // How: load current team, merge identity fields, then let the schema handle persistence transforms.
    const currentTeam = await this.getTeamById(teamId);
    const nextName = payload.name ?? currentTeam.name;
    const nextShortName = payload.shortName ?? currentTeam.shortName;

    await this.ensureUniqueTeam(nextName, nextShortName, teamId);

    const updatedTeam = await this.teamRepository.updateById(teamId, payload);

    if (!updatedTeam) {
      // What: guard against a race where the team was deleted after the first lookup.
      // Why: returning null would make the API response inconsistent.
      // How: throw the same 404 used by normal missing-team lookups.
      throw new NotFound("Team not found");
    }

    return updatedTeam;
  }

  async deleteTeam(teamId) {
    // What: soft-delete an active team.
    // Why: delete endpoints should preserve historical references for matches.
    // How: run an existence check, then mark the team deleted in the repository.
    await this.getTeamById(teamId);
    const deletedTeam = await this.teamRepository.softDeleteById(teamId);

    if (!deletedTeam) {
      // What: guard against concurrent deletion.
      // Why: the service should always return a predictable not-found error.
      // How: throw AppError after the repository reports no updated document.
      throw new NotFound("Team not found");
    }

    return deletedTeam;
  }

  async ensureUniqueTeam(name, shortName, excludedTeamId = null) {
    // What: verify that name and shortName are unique among active teams.
    // Why: Mongoose unique indexes can throw late DB errors; service errors are clearer.
    // How: query the repository and compare the matched fields with requested values.
    const existingTeam = await this.teamRepository.findByNameOrShortName(
      name,
      shortName,
      excludedTeamId,
    );

    if (!existingTeam) {
      // What: allow the caller to continue when no conflict exists.
      // Why: create/update should only fail for real duplicates.
      // How: return early without throwing.
      return;
    }

    if (existingTeam.name === name) {
      // What: report a duplicate full team name.
      // Why: users need to know exactly which field caused the conflict.
      // How: throw a 409 conflict AppError.
      throw new Conflict("Team name already exists");
    }

    // What: report a duplicate short team code.
    // Why: shortName is used heavily in scorecards and match rows.
    // How: throw a 409 conflict AppError.
    throw new Conflict("Team short name already exists");
  }
}

export default TeamService;
