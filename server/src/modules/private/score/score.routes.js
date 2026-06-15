import express from "express";
import ScoreController from "./score.controller.js";
import { validateRequest } from "../../shared/middleware/validateRequest.js";

import {
  createScoreSchema,
  updateScoreSchema,
  matchParamSchema,
  scoreParamSchema,
} from "./dto/score.dto.js";

class ScoreRoute {
  constructor(scoreController = new ScoreController()) {
    this.router = express.Router();
    this.scoreController = scoreController;

    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post(
      "/",
      validateRequest(createScoreSchema),
      this.scoreController.createScore,
    );

    this.router.patch(
      "/:id",
      validateRequest(updateScoreSchema),
      this.scoreController.updateScore,
    );

    this.router.get(
      "/match/:matchId",
      validateRequest(matchParamSchema),
      this.scoreController.getScoresByMatch,
    );
    this.router.delete(
      "/:id",
      validateRequest(scoreParamSchema),
      this.scoreController.deleteScore,
    );
  }
  getRouter() {
    return this.router;
  }
}
const scoreRoute = new ScoreRoute();

export default scoreRoute.getRouter();
