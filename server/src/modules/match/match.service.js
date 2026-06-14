import AppError from "../../shared/errors/AppError.js";
import MatchRepository from "./match.repository.js";

class MatchService {
  constructor(matchRepository = new MatchRepository()) {
    // What: receive the repository dependency.
    // Why: service logic stays testable and independent from direct Mongoose usage.
    // How: default to the real MatchRepository for normal runtime execution.
    this.matchRepository = matchRepository;
  }

  async listMatches() {
    // What: return every active match.
    // Why: admin match-management pages need a match list endpoint.
    // How: delegate the database query to the repository.
    return this.matchRepository.findAll();
  }

  async getMatchById(matchId) {
    // What: return one active match by id.
    // Why: detail screens and update flows need a reliable lookup.
    // How: ask the repository for the match and throw 404 if it is missing.
    const match = await this.matchRepository.findById(matchId);

    if (!match) {
      // What: stop processing when the match does not exist.
      // Why: callers should receive a clear 404 instead of null data.
      // How: throw a shared not-found AppError.
      throw AppError.notFound("Match not found");
    }

    return match;
  }

  async createMatch(payload) {
    // What: create a new scheduled match.
    // Why: admins need to register fixtures before toss/scoring workflows begin.
    // How: validate basic match consistency, then insert through the repository.
    this.ensureDifferentTeams(payload.team1, payload.team2);

    return this.matchRepository.create(payload);
  }

  async updateMatch(matchId, payload) {
    // What: update match metadata or initial lifecycle fields.
    // Why: admin screens need safe partial match edits without replacing the document.
    // How: load the current match, validate team consistency, then update through repository.
    const currentMatch = await this.getMatchById(matchId);
    const nextTeam1 = payload.team1 ?? String(currentMatch.team1);
    const nextTeam2 = payload.team2 ?? String(currentMatch.team2);

    this.ensureDifferentTeams(nextTeam1, nextTeam2);

    const updatedMatch = await this.matchRepository.updateById(matchId, payload);

    if (!updatedMatch) {
      // What: handle a race where the match was deleted after the first lookup.
      // Why: returning null would make the API response inconsistent.
      // How: throw the same not-found error used by normal lookups.
      throw AppError.notFound("Match not found");
    }

    return updatedMatch;
  }

  async deleteMatch(matchId) {
    // What: soft-delete an active match.
    // Why: match records may be referenced later by scores, commentary, or audit views.
    // How: verify existence first, then mark the record deleted through the repository.
    await this.getMatchById(matchId);
    const deletedMatch = await this.matchRepository.softDeleteById(matchId);

    if (!deletedMatch) {
      // What: guard against concurrent deletion.
      // Why: services should expose predictable not-found behavior.
      // How: throw AppError when repository returns no updated document.
      throw AppError.notFound("Match not found");
    }

    return deletedMatch;
  }

  ensureDifferentTeams(team1, team2) {
    // What: ensure both sides of a match are different teams.
    // Why: a match where team1 equals team2 is invalid cricket data.
    // How: compare ObjectId strings after converting both values to strings.
    if (String(team1) === String(team2)) {
      throw AppError.badRequest("team1 and team2 must be different teams");
    }
  }
}

export default MatchService;
