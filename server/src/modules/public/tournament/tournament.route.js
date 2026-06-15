import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest.js";
import PublicTournamentController from "./tournament.controller.js";
import { tournamentIdSchema } from "../../../validators/tournament.validator.js";

class PublicTournamentRoute {
  constructor(tournamentController = new PublicTournamentController()) {
    this.router = Router();
    this.tournamentController = tournamentController;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", this.tournamentController.listTournaments);
    this.router.get(
      "/:id",
      validateRequest(tournamentIdSchema),
      this.tournamentController.getTournament,
    );
  }

  getRouter() {
    return this.router;
  }
}

const publicTournamentRoute = new PublicTournamentRoute();

export default publicTournamentRoute.getRouter();
