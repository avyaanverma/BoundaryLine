import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest.js";
import PublicScoreController from "./score.controller.js";
import { matchParamSchema } from "../../../validators/score.validator.js";

class PublicScoreRoute {
  constructor(scoreController = new PublicScoreController()) {
    this.router = Router();
    this.scoreController = scoreController;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get(
      "/match/:matchId",
      validateRequest(matchParamSchema),
      this.scoreController.getScoresByMatch,
    );
  }

  getRouter() {
    return this.router;
  }
}

const publicScoreRoute = new PublicScoreRoute();

export default publicScoreRoute.getRouter();
