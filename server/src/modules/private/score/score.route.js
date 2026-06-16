import { Router } from "express";
import ScoreController from "./score.controller.js";
import { validateRequest } from "../../../middleware/validateRequest.js";
import {
  createScoreSchema,
  updateScoreSchema,
  scoreParamSchema,
} from "../../../validators/score.validator.js";
import {
  authMiddleware,
  authorizationMiddleware,
} from "../../../middleware/auth.middleware.js";
import { ROLES } from "../../../constant/role.constant.js";

class ScoreRoute {
  constructor(scoreController = new ScoreController()) {
    this.router = Router();
    this.scoreController = scoreController;

    this.registerRoutes();
  }

  registerRoutes() {
    const WRITE_ROLES = [ROLES.SCORER, ROLES.ADMIN, ROLES.SUPER_ADMIN];

    // Create score
    this.router.post(
      "/",
      authMiddleware,
      authorizationMiddleware(WRITE_ROLES),
      validateRequest(createScoreSchema),
      this.scoreController.createScore,
    );

    // Update score
    this.router.patch(
      "/:id",
      authMiddleware,
      authorizationMiddleware(WRITE_ROLES),
      validateRequest(updateScoreSchema),
      this.scoreController.updateScore,
    );

    // Delete score
    this.router.delete(
      "/:id",
      authMiddleware,
      authorizationMiddleware([ROLES.ADMIN, ROLES.SUPER_ADMIN]),
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
