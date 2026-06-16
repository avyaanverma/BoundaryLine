import BadRequest from "../../../shared/error/BadRequest.js";
import NotFound from "../../../shared/error/NotFound.js";
import MatchRepository from "../../../repository/match.repository.js";
import { emitToMatch } from "../../../shared/socket/emitToMatch.js";
import { logger } from "../../../shared/utils/logger.js";
import { SOCKET_EVENTS } from "../../../constant/socket-events.constant.js";

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
      throw new NotFound("Match not found");
    }

    return match;
  }

  async createMatch(payload) {
    // What: create a new scheduled match.
    // Why: admins need to register fixtures before toss/scoring workflows begin.
    // How: validate basic match consistency, then insert through the repository.
    this.ensureDifferentTeams(payload.team1, payload.team2);

    const match = await this.matchRepository.create(payload);

    emitToMatch(match._id.toString(), SOCKET_EVENTS.MATCH_CREATED, {
      matchId: match._id,
      status: match.status
    });

    logger.info(
      {
        event: SOCKET_EVENTS.MATCH_CREATED,
        matchId: match._id,
      },
      "Socket event emitted"
    );

    return match;
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
      throw new NotFound("Match not found");
    }

    // Handle Socket Events
    const socketPayload = {
      matchId: updatedMatch._id,
      status: updatedMatch.status,
      winner: updatedMatch.winner || null
    };

    emitToMatch(matchId.toString(), SOCKET_EVENTS.MATCH_UPDATED, updatedMatch);

    logger.info(
      {
        event: SOCKET_EVENTS.MATCH_UPDATED,
        matchId: updatedMatch._id,
      },
      "Socket event emitted"
    );

    // Status change events
    if (payload.status && payload.status !== currentMatch.status) {
      emitToMatch(matchId.toString(), SOCKET_EVENTS.MATCH_STATUS_UPDATED, socketPayload);

      logger.info(
        {
          event: SOCKET_EVENTS.MATCH_STATUS_UPDATED,
          matchId: updatedMatch._id,
          status: updatedMatch.status
        },
        "Socket event emitted"
      );

      if (payload.status === "LIVE" && currentMatch.status !== "LIVE") {
        emitToMatch(matchId.toString(), SOCKET_EVENTS.MATCH_STARTED, socketPayload);
        logger.info({ event: SOCKET_EVENTS.MATCH_STARTED, matchId }, "Socket event emitted");

        // Innings Started
        const inningsNumber = (currentMatch.status === "INNINGS_BREAK") ? 2 : 1;
        emitToMatch(matchId.toString(), SOCKET_EVENTS.INNINGS_STARTED, {
            matchId,
            inningsNumber
        });
        logger.info({ event: SOCKET_EVENTS.INNINGS_STARTED, matchId, inningsNumber }, "Socket event emitted");
      }

      if (payload.status === "INNINGS_BREAK" && currentMatch.status !== "INNINGS_BREAK") {
          emitToMatch(matchId.toString(), SOCKET_EVENTS.INNINGS_COMPLETED, {
              matchId,
              inningsNumber: 1
          });
          logger.info({ event: SOCKET_EVENTS.INNINGS_COMPLETED, matchId, inningsNumber: 1 }, "Socket event emitted");
      }

      if (payload.status === "COMPLETED" && currentMatch.status !== "COMPLETED") {
        emitToMatch(matchId.toString(), SOCKET_EVENTS.MATCH_COMPLETED, socketPayload);
        logger.info({ event: SOCKET_EVENTS.MATCH_COMPLETED, matchId }, "Socket event emitted");
      }
    }

    // Toss completed event
    if (payload.tossWinner && !currentMatch.tossWinner) {
        emitToMatch(matchId.toString(), SOCKET_EVENTS.TOSS_COMPLETED, {
            matchId,
            tossWinner: updatedMatch.tossWinner,
            decision: updatedMatch.tossDecision
        });
        logger.info({ event: SOCKET_EVENTS.TOSS_COMPLETED, matchId }, "Socket event emitted");
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
      throw new NotFound("Match not found");
    }

    return deletedMatch;
  }

  ensureDifferentTeams(team1, team2) {
    // What: ensure both sides of a match are different teams.
    // Why: a match where team1 equals team2 is invalid cricket data.
    // How: compare ObjectId strings after converting both values to strings.
    if (String(team1) === String(team2)) {
      throw new BadRequest("team1 and team2 must be different teams");
    }
  }
}

export default MatchService;
