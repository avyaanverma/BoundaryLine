import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest.js";
import TournamentController from "./tournament.controller.js";
import {
  createTournamentSchema,
  updateTournamentSchema,
  tournamentIdSchema,
  scorerIdSchema,
  scorerEmailSchema,
} from "../../../validators/tournament.validator.js";
import { authMiddleware } from "../../../middleware/auth.middleware.js";

class TournamentRoute {
  constructor(tournamentController = new TournamentController()) {
    this.router = Router();
    this.tournamentController = tournamentController;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post(
      "/",
      authMiddleware,
      validateRequest(createTournamentSchema),
      this.tournamentController.createTournament,
    );

    this.router.patch(
      "/:id",
      authMiddleware,
      validateRequest({
        ...tournamentIdSchema,
        ...updateTournamentSchema,
      }),
      this.tournamentController.updateTournament,
    );

    this.router.post(
      "/:id/scorers",
      authMiddleware,
      validateRequest(scorerEmailSchema),
      this.tournamentController.addScorerByEmail,
    );

    this.router.post(
      "/:id/scorers/:scorerId",
      authMiddleware,
      validateRequest(scorerIdSchema),
      this.tournamentController.addScorer,
    );

    this.router.delete(
      "/:id/scorers/:scorerId",
      authMiddleware,
      validateRequest(scorerIdSchema),
      this.tournamentController.removeScorer,
    );

    this.router.delete(
      "/:id",
      authMiddleware,
      validateRequest(tournamentIdSchema),
      this.tournamentController.deleteTournament,
    );
  }

  getRouter() {
    return this.router;
  }
}

const tournamentRoute = new TournamentRoute();

export default tournamentRoute.getRouter();
