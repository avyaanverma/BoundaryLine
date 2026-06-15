import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest.js";
import PlayerController from "./player.controller.js";
import {
  createPlayerSchema,
  listPlayersSchema,
  playerIdParamSchema,
  updatePlayerSchema,
} from "../../../validators/player.validator.js";

class PlayerRoute {
  constructor(playerController = new PlayerController()) {
    this.router = Router();
    this.playerController = playerController;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post(
      "/",
      validateRequest(createPlayerSchema),
      this.playerController.createPlayer,
    );
    this.router.patch(
      "/:id",
      validateRequest(updatePlayerSchema),
      this.playerController.updatePlayer,
    );
    this.router.delete(
      "/:id",
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
