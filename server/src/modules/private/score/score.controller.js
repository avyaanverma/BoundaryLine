import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
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

    return res.status(201).json({
      success: true,
      message: "Score created successfully",
      data: score,
    });
  });

  updateScore = asyncHandler(async (req, res) => {
    const score = await this.scoreService.updateScore(
      req.validated.params.id,
      req.validated.body,
      req.user?._id || null,
    );

    return res.status(200).json({
      success: true,
      message: "Score updated successfully",
      data: score,
    });
  });

  getScoresByMatch = asyncHandler(async (req, res) => {
    const scores = await this.scoreService.getScoresByMatch(
      req.validated.params.matchId,
    );

    return res.status(200).json({
      success: true,
      data: scores,
    });
  });

  deleteScore = asyncHandler(async (req, res) => {
    const score = await this.scoreService.deleteScore(req.validated.params.id);

    return res.status(200).json({
      success: true,
      message: "Score deleted successfully",
      data: score,
    });
  });
}

export default ScoreController;
