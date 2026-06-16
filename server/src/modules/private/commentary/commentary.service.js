import commentaryRepository from "../../../repository/commentary.respository.js";
import Match from "../../../model/match.model.js";
import { logger } from "../../../shared/utils/logger.js";
import { emitToMatch } from "../../../shared/socket/emitToMatch.js";
import CommentaryDTO from "./dto/commentary.dto.js";
import NotFound from "../../../shared/error/NotFound.js";
import BadRequest from "../../../shared/error/BadRequest.js";
import { SOCKET_EVENTS } from "../../../constant/socket-events.constant.js";

class CommentaryService {
  constructor(repository = commentaryRepository) {
    this.commentaryRepository = repository;
  }

  /**
   * Checks if match is LIVE or not validate krta hai
   * Comentary only on live or ININGS_BREAK, status me allowed hai
   */
  async ensureLiveMatch(matchId) {
    const match = await Match.findOne({
      _id: matchId,
      isDeleted: false,
    });

    if (!match) {
      logger.warn({ matchId }, "Match not FOUND during VALIDATION");
      throw new NotFound("Match Not Found or is Deleted");
    }
    const liveStatuses = ["LIVE", "INNINGS_BREAK"];

    if (!liveStatuses.includes(match.status)) {
      logger.warn(
        { matchId, status: match.status },
        "Commentary modified on a non-live match",
      );
      throw new BadRequest(
        `Match is not live(current status is:${match.status})`,
      );
    }
  }

  async addCommentary(commentaryData, userId) {
    logger.info({ matchId: commentaryData.matchId }, "Adding commentary entry");

    await this.ensureLiveMatch(commentaryData.matchId);

    const payload = { ...commentaryData, createdBy: userId, updatedBy: userId };

    const commentary = await this.commentaryRepository.create(payload);

    logger.info(
      {
        commentaryId: commentary._id,
      },
      "Commentary entry created sucessfully",
    );

    const socketPayload = {
      matchId: commentary.matchId,
      commentaryId: commentary._id,
      over: commentary.over,
      ball: commentary.ball,
      text: commentary.text,
      ...commentary.toObject()
    };

    emitToMatch(
      commentary.matchId.toString(),
      SOCKET_EVENTS.COMMENTARY_CREATED,
      socketPayload,
    );

    logger.info(
      {
        event: SOCKET_EVENTS.COMMENTARY_CREATED,
        matchId: commentary.matchId,
        commentaryId: commentary._id,
      },
      "Socket event emitted"
    );

    return new CommentaryDTO(commentary);
  }

  async getCommentaryByMatch(matchId, limit = 50, page = 1) {
    logger.info(
      {
        matchId,
        limit,
        page,
      },
      "Fetching commentaries by match ID",
    );

    return this.commentaryRepository.findByMatchId(matchId, limit, page);
  }

  async deleteCommentary(id, userId) {
    logger.info(
      {
        commentaryId: id,
      },
      "Deleting commentary  entry",
    );

    const commentary = await this.commentaryRepository.findById(id);

    if (!commentary) {
      logger.warn({ commentaryId: id }, "Commentary entry not found");
      throw new NotFound("Commentary entry not found");
    }

    await this.ensureLiveMatch(commentary.matchId);

    await this.commentaryRepository.deleteById(id);

    logger.info(
      {
        commentaryId: id,
      },
      "Commentary deleted Sucessfully",
    );

    emitToMatch(commentary.matchId.toString(), SOCKET_EVENTS.COMMENTARY_DELETED, { id, matchId: commentary.matchId });

    logger.info(
      {
        event: SOCKET_EVENTS.COMMENTARY_DELETED,
        matchId: commentary.matchId,
        commentaryId: id,
      },
      "Socket event emitted"
    );

    return new CommentaryDTO(commentary);
  }
}

export default CommentaryService;
