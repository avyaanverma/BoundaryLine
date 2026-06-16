import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest.js";
import MatchController from "./match.controller.js";
import {
  createMatchSchema,
  matchIdParamSchema,
  updateMatchSchema,
} from "../../../validators/match.validator.js";
import { authenticateRequest, authorizeRoles } from "../../../middleware/auth.middleware.js";
import { ROLES } from "../../../constant/role.constant.js";

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
    this.router.post(
      "/",
      authenticateRequest,
      authorizeRoles([ROLES.ADMIN, ROLES.SUPER_ADMIN]),
      validateRequest(createMatchSchema),
      this.matchController.createMatch,
    );
    this.router.patch(
      "/:id",
      authenticateRequest,
      authorizeRoles([ROLES.ADMIN, ROLES.SUPER_ADMIN]),
      validateRequest(updateMatchSchema),
      this.matchController.updateMatch,
    );
    this.router.delete(
      "/:id",
      authenticateRequest,
      authorizeRoles([ROLES.ADMIN, ROLES.SUPER_ADMIN]),
      validateRequest(matchIdParamSchema),
      this.matchController.deleteMatch,
    );
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
