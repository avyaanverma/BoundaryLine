import { Router } from "express";
import ScoreController from "./score.controller.js";

import { validateRequest } from "../../../middleware/validateRequest.js";

import {
  authenticate,
  authorize,
} from "../../../middleware/auth.middleware.js";

import {
  createScoreSchema,
  updateScoreSchema,
  scoreParamSchema,
  matchParamSchema,
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
      authenticate,
      authorize("SUPER_ADMIN", "ADMIN", "SCORER"),
      validateRequest(createScoreSchema),
      this.scoreController.createScore
    );

    // Update score
    this.router.patch(
      "/:id",
      authenticate,
      authorize("SUPER_ADMIN", "ADMIN", "SCORER"),
      validateRequest(updateScoreSchema),
      this.scoreController.updateScore
    );


    // Delete score
    this.router.delete(
      "/:id",
      authenticate,
      authorize("SUPER_ADMIN", "ADMIN"),
      validateRequest(scoreParamSchema),
      this.scoreController.deleteScore
    );
  }

  getRouter() {
    return this.router;
  }
}

const scoreRoute = new ScoreRoute();

export default scoreRoute.getRouter();