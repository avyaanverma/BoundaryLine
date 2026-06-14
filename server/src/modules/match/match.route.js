import { Router } from "express";
import { validateRequest } from "../../shared/middleware/validateRequest.js";
import MatchController from "./match.controller.js";
import {
  createMatchSchema,
  matchIdParamSchema,
  updateMatchSchema,
} from "../../validators/match.validator.js";

class MatchRoute {
  constructor(matchController = new MatchController()) {
    // What: prepare the Express router and controller dependency.
    // Why: app.js should mount a complete match router without knowing endpoint internals.
    // How: create a Router instance and register all initial match endpoints.
    this.router = Router();
    this.matchController = matchController;
    this.registerRoutes();
  }

  registerRoutes() {
    // What: map match HTTP endpoints to controller methods.
    // Why: route files should own URL shape, middleware order, and controller binding.
    // How: validate request input before calling class-based controller handlers.
    this.router.get("/", this.matchController.listMatches);
    this.router.get("/:id", validateRequest(matchIdParamSchema), this.matchController.getMatch);
    this.router.post("/", validateRequest(createMatchSchema), this.matchController.createMatch);
    this.router.patch("/:id", validateRequest(updateMatchSchema), this.matchController.updateMatch);
    this.router.delete("/:id", validateRequest(matchIdParamSchema), this.matchController.deleteMatch);
  }

  getRouter() {
    // What: expose the configured Express router.
    // Why: app.js can mount this module through a stable public method.
    // How: return the router created in the constructor.
    return this.router;
  }
}

const matchRoute = new MatchRoute();

export default matchRoute.getRouter();
