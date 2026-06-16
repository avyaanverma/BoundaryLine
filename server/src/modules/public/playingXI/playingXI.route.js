import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest.js";
import PublicPlayingXIController from "./playingXI.controller.js";
import { playingXIIdSchema } from "../../../validators/playingXI.validator.js";

class PublicPlayingXIRoute {
  constructor(playingXIController = new PublicPlayingXIController()) {
    this.router = Router();
    this.playingXIController = playingXIController;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", this.playingXIController.listPlayingXIs);
    this.router.get(
      "/:id",
      validateRequest(playingXIIdSchema),
      this.playingXIController.getPlayingXI,
    );
  }

  getRouter() {
    return this.router;
  }
}

const publicPlayingXIRoute = new PublicPlayingXIRoute();

export default publicPlayingXIRoute.getRouter();
