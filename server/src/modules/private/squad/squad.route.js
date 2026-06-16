import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest.js";
import SquadController from "./squad.controller.js";
import {
  authMiddleware,
  authorizationMiddleware,
} from "../../../middleware/auth.middleware.js";
import { ROLES } from "../../../constant/role.constant.js";
import {
  createSquadSchema,
  updateSquadSchema,
  squadIdSchema,
} from "../../../validators/squad.validator.js";

class SquadRoute {
  constructor(squadController = new SquadController()) {
    this.router = Router();
    this.squadController = squadController;
    this.registerRoutes();
  }

  registerRoutes() {
    const ADMIN_ROLES = [ROLES.ADMIN, ROLES.SUPER_ADMIN];

    this.router.post(
      "/",
      authMiddleware,
      authorizationMiddleware(ADMIN_ROLES),
      validateRequest(createSquadSchema),
      this.squadController.createSquad,
    );

    this.router.patch(
      "/:id",
      authMiddleware,
      authorizationMiddleware(ADMIN_ROLES),
      validateRequest({
        ...squadIdSchema,
        ...updateSquadSchema,
      }),
      this.squadController.updateSquad,
    );

    this.router.delete(
      "/:id",
      authMiddleware,
      authorizationMiddleware(ADMIN_ROLES),
      validateRequest(squadIdSchema),
      this.squadController.deleteSquad,
    );
  }

  getRouter() {
    return this.router;
  }
}

const squadRoute = new SquadRoute();

export default squadRoute.getRouter();
