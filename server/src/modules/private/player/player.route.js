import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest.js";
import PlayerController from "./player.controller.js";
import {
  createPlayerSchema,
  listPlayersSchema,
  playerIdParamSchema,
  updatePlayerSchema,
} from "../../../validators/player.validator.js";
import {
  authMiddleware,
  authorizationMiddleware,
} from "../../../middleware/auth.middleware.js";
import { ROLES } from "../../../constant/role.constant.js";

class PlayerRoute {
  constructor(playerController = new PlayerController()) {
    this.router = Router();
    this.playerController = playerController;
    this.registerRoutes();
  }

  registerRoutes() {
    const ADMIN_ROLES = [ROLES.ADMIN, ROLES.SUPER_ADMIN];

    this.router.post(
      "/",
      authMiddleware,
      authorizationMiddleware(ADMIN_ROLES),
      validateRequest(createPlayerSchema),
      this.playerController.createPlayer,
    );
    this.router.patch(
      "/:id",
      authMiddleware,
      authorizationMiddleware(ADMIN_ROLES),
      validateRequest(updatePlayerSchema),
      this.playerController.updatePlayer,
    );
    this.router.delete(
      "/:id",
      authMiddleware,
      authorizationMiddleware(ADMIN_ROLES),
      validateRequest(playerIdParamSchema),
      this.playerController.deletePlayer,
    );
  }

  getRouter() {
    return this.router;
  }
}

const playerRoute = new PlayerRoute();

export default playerRoute.getRouter();
