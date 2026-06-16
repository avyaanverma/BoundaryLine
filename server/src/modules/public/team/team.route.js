import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest.js";
import PublicTeamController from "./team.controller.js";
import { teamIdParamSchema } from "../../../validators/team.validator.js";

class PublicTeamRoute {
  constructor(teamController = new PublicTeamController()) {
    // What: prepare the Express router and controller dependency.
    // Why: the app can mount a complete module router without knowing route details.
    // How: create a Router instance and register all team endpoints in one place.
    this.router = Router();
    this.teamController = teamController;
    this.registerRoutes();
  }

  registerRoutes() {
    // What: map team HTTP endpoints to controller methods.
    // Why: route files should own URL shape, middleware order, and controller binding.
    // How: validate inputs first, then call class-based controller handlers.
    this.router.get("/", this.teamController.listTeams);
    this.router.get(
      "/:id",
      validateRequest(teamIdParamSchema),
      this.teamController.getTeam,
    );
  }

  getRouter() {
    // What: expose the configured Express router.
    // Why: app.js should mount routers without accessing class internals.
    // How: return the router instance created in the constructor.
    return this.router;
  }
}

const publicTeamRoute = new PublicTeamRoute();

export default publicTeamRoute.getRouter();
