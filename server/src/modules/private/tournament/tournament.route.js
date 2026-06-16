import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest.js";
import TournamentController from "./tournament.controller.js";
import {
  createTournamentSchema,
  updateTournamentSchema,
  tournamentIdSchema,
} from "../../../validators/tournament.validator.js";

class TournamentRoute {
  constructor(tournamentController = new TournamentController()) {
    this.router = Router();
    this.tournamentController = tournamentController;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post(
      "/",
      validateRequest(createTournamentSchema),
      this.tournamentController.createTournament,
    );

    this.router.patch(
      "/:id",
      validateRequest({
        ...tournamentIdSchema,
        ...updateTournamentSchema,
      }),
      this.tournamentController.updateTournament,
    );

    this.router.delete(
      "/:id",
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
