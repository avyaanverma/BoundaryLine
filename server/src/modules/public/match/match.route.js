import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest.js";
import PublicMatchController from "./match.controller.js";
import { matchIdParamSchema } from "../../../validators/match.validator.js";

class PublicMatchRoute {
  constructor(matchController = new PublicMatchController()) {
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
  }

  getRouter() {
    // What: expose the configured Express router.
    // Why: app.js can mount this module through a stable public method.
    // How: return the router created in the constructor.
    return this.router;
  }
}

const publicMatchRoute = new PublicMatchRoute();

export default publicMatchRoute.getRouter();
