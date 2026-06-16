import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import ScoreService from "../../private/score/score.service.js";

class PublicScoreController {
  constructor(scoreService = new ScoreService()) {
    this.scoreService = scoreService;
  }

  getScoresByMatch = asyncHandler(async (req, res) => {
    const scores = await this.scoreService.getScoresByMatch(
      req.validated.params.matchId,
    );

    return new ApiResponse(200, "Scores fetched successfully", scores).send(res);
  });
}

export default PublicScoreController;
