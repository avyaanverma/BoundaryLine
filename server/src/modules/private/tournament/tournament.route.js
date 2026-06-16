import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest.js";
import TournamentController from "./tournament.controller.js";
import {
  createTournamentSchema,
  updateTournamentSchema,
  tournamentIdSchema,
} from "../../../validators/tournament.validator.js";
import {
  authMiddleware,
  authorizationMiddleware,
} from "../../../middleware/auth.middleware.js";
import { ROLES } from "../../../constant/role.constant.js";

class TournamentRoute {
  constructor(tournamentController = new TournamentController()) {
    this.router = Router();
    this.tournamentController = tournamentController;
    this.registerRoutes();
  }

  registerRoutes() {
    const ADMIN_ROLES = [ROLES.ADMIN, ROLES.SUPER_ADMIN];

    this.router.post(
      "/",
      authMiddleware,
      authorizationMiddleware(ADMIN_ROLES),
      validateRequest(createTournamentSchema),
      this.tournamentController.createTournament,
    );

    this.router.patch(
      "/:id",
      authMiddleware,
      authorizationMiddleware(ADMIN_ROLES),
      validateRequest({
        ...tournamentIdSchema,
        ...updateTournamentSchema,
      }),
      this.tournamentController.updateTournament,
    );

    this.router.delete(
      "/:id",
      authMiddleware,
      authorizationMiddleware(ADMIN_ROLES),
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
