import ScoreRepository from "../../../repository/score.repository.js";
import { Match } from "../../shared/models/reference.model.js";
import BadRequest from "../../../shared/error/BadRequest.js";
import NotFound from "../../../shared/error/NotFound.js";
import { emitToMatch } from "../../../shared/socket/emitToMatch.js";
import { logger } from "../../../shared/utils/logger.js";
import { SOCKET_EVENTS } from "../../../constant/socket-events.constant.js";

class ScoreService {
  constructor(scoreRepository = new ScoreRepository()) {
    this.scoreRepository = scoreRepository;
  }

  async ensureLiveMatch(matchId) {
    const match = await Match.findOne({
      _id: matchId,
      isDeleted: false,
    });

    if (!match) {
      throw new NotFound("Match not found or deleted");
    }

    const allowedStatuses = ["LIVE", "INNINGS_BREAK"];

    if (!allowedStatuses.includes(match.status)) {
      throw new BadRequest(
        `Match is not active (current status: ${match.status})`,
      );
    }

    return match;
  }

  async createScore(scoreData, userId) {
    logger.info(
      {
        matchId: scoreData.matchId,
      },
      "Creating score",
    );

    await this.ensureLiveMatch(scoreData.matchId);

    const payload = {
      ...scoreData,
      createdBy: userId,
      updatedBy: userId,
    };

    const score = await this.scoreRepository.create(payload);

    emitToMatch(score.matchId.toString(), SOCKET_EVENTS.SCORE_CREATED, score);

    logger.info(
      {
        event: SOCKET_EVENTS.SCORE_CREATED,
        matchId: score.matchId,
        scoreId: score._id,
      },
      "Socket event emitted"
    );

    return score;
  }

  async updateScore(scoreId, updateData, userId) {
    const score = await this.scoreRepository.findById(scoreId);

    if (!score) {
      throw new NotFound("Score not found");
    }

    await this.ensureLiveMatch(score.matchId);

    const payload = {
      ...updateData,
      updatedBy: userId,
    };

    const updatedScore = await this.scoreRepository.updateById(
      scoreId,
      payload,
    );

    // Concurrent soft-delete safety
    if (!updatedScore) {
      throw new NotFound("Score not found or deleted");
    }

    emitToMatch(updatedScore.matchId.toString(), SOCKET_EVENTS.SCORE_UPDATED, updatedScore);

    logger.info(
      {
        event: SOCKET_EVENTS.SCORE_UPDATED,
        matchId: updatedScore.matchId,
        scoreId: updatedScore._id,
      },
      "Socket event emitted"
    );

    // Over Completed detection
    if (updatedScore.overs && updatedScore.overs.endsWith(".0") && updatedScore.overs !== "0.0") {
        const overNumber = parseInt(updatedScore.overs.split(".")[0]);
        emitToMatch(updatedScore.matchId.toString(), SOCKET_EVENTS.OVER_COMPLETED, {
            matchId: updatedScore.matchId,
            overNumber
        });
        logger.info(
            {
                event: SOCKET_EVENTS.OVER_COMPLETED,
                matchId: updatedScore.matchId,
                overNumber
            },
            "Socket event emitted"
        );
    }

    return updatedScore;
  }

  async getScoresByMatch(matchId) {
    return this.scoreRepository.findByMatchId(matchId);
  }

  async deleteScore(scoreId) {

    const score =
      await this.scoreRepository.findById(scoreId);

    if (!score) {
      throw new NotFound("Score not found");
    }

    const deletedScore =
      await this.scoreRepository.softDelete(
        scoreId
      );

    const payload = {
      scoreId: score._id
    };

    emitToMatch(
      score.matchId.toString(),
      SOCKET_EVENTS.SCORE_DELETED,
      payload
    );

    logger.info(
      {
        event: SOCKET_EVENTS.SCORE_DELETED,
        matchId: score.matchId,
        scoreId: score._id,
      },
      "Socket event emitted"
    );

    return deletedScore;
  }
}

export default ScoreService;
