import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import ScoreService from "./score.service.js";

class ScoreController {
  constructor(scoreService = new ScoreService()) {
    this.scoreService = scoreService;
  }

  createScore = asyncHandler(async (req, res) => {
    const score = await this.scoreService.createScore(
      req.validated.body,
      req.user?._id || null,
    );

    return new ApiResponse(201, "Score created successfully", score).send(res);
  });

  updateScore = asyncHandler(async (req, res) => {
    const score = await this.scoreService.updateScore(
      req.validated.params.id,
      req.validated.body,
      req.user?._id || null,
    );

    return new ApiResponse(200, "Score updated successfully", score).send(res);
  });

  deleteScore = asyncHandler(async (req, res) => {
    const score = await this.scoreService.deleteScore(req.validated.params.id);

    return new ApiResponse(200, "Score deleted successfully", score).send(res);
  });
}

export default ScoreController;
