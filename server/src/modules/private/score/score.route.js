import { Router } from "express";
import ScoreController from "./score.controller.js";
import { validateRequest } from "../../../middleware/validateRequest.js";
import {
  createScoreSchema,
  updateScoreSchema,
  scoreParamSchema,
} from "../../../validators/score.validator.js";

class ScoreRoute {
  constructor(scoreController = new ScoreController()) {
    this.router = Router();
    this.scoreController = scoreController;

    this.registerRoutes();
  }

  registerRoutes() {
    // Create score
    this.router.post(
      "/",
      validateRequest(createScoreSchema),
      this.scoreController.createScore,
    );

    // Update score
    this.router.patch(
      "/:id",
      validateRequest(updateScoreSchema),
      this.scoreController.updateScore,
    );

    // Delete score
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
