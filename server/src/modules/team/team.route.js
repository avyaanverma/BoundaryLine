import { Router } from "express";
import { validateRequest } from "../../shared/middleware/validateRequest.js";
import TeamController from "./team.controller.js";
import {
  createTeamSchema,
  teamIdParamSchema,
  updateTeamSchema,
} from "../../validators/team.validator.js";

class TeamRoute {
  constructor(teamController = new TeamController()) {
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
    this.router.get("/:id", validateRequest(teamIdParamSchema), this.teamController.getTeam);
    this.router.post("/", validateRequest(createTeamSchema), this.teamController.createTeam);
    this.router.patch("/:id", validateRequest(updateTeamSchema), this.teamController.updateTeam);
    this.router.delete("/:id", validateRequest(teamIdParamSchema), this.teamController.deleteTeam);
  }

  getRouter() {
    // What: expose the configured Express router.
    // Why: app.js should mount routers without accessing class internals.
    // How: return the router instance created in the constructor.
    return this.router;
  }
}

const teamRoute = new TeamRoute();

export default teamRoute.getRouter();
