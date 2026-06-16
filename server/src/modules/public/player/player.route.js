import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest.js";
import PublicPlayerController from "./player.controller.js";
import {
  listPlayersSchema,
  playerIdParamSchema,
} from "../../../validators/player.validator.js";

class PublicPlayerRoute {
  constructor(playerController = new PublicPlayerController()) {
    this.router = Router();
    this.playerController = playerController;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get(
      "/",
      validateRequest(listPlayersSchema),
      this.playerController.listPlayers,
    );
    this.router.get(
      "/:id",
      validateRequest(playerIdParamSchema),
      this.playerController.getPlayer,
    );
  }

  getRouter() {
    return this.router;
  }
}

const playerRoute = new PublicPlayerRoute();

export default playerRoute.getRouter();
