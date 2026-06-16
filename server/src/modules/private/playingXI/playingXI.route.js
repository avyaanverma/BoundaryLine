import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest.js";
import PlayingXIController from "./playingXI.controller.js";
import {
  authMiddleware,
  authorizationMiddleware,
} from "../../../middleware/auth.middleware.js";
import { ROLES } from "../../../constant/role.constant.js";
import {
  createPlayingXISchema,
  updatePlayingXISchema,
  playingXIIdSchema,
} from "../../../validators/playingXI.validator.js";

class PlayingXIRoute {
  constructor(playingXIController = new PlayingXIController()) {
    this.router = Router();
    this.playingXIController = playingXIController;
    this.registerRoutes();
  }

  registerRoutes() {
    const ADMIN_ROLES = [ROLES.ADMIN, ROLES.SUPER_ADMIN];

    this.router.post(
      "/",
      authMiddleware,
      authorizationMiddleware(ADMIN_ROLES),
      validateRequest(createPlayingXISchema),
      this.playingXIController.createPlayingXI,
    );

    this.router.patch(
      "/:id",
      authMiddleware,
      authorizationMiddleware(ADMIN_ROLES),
      validateRequest({
        ...playingXIIdSchema,
        ...updatePlayingXISchema,
      }),
      this.playingXIController.updatePlayingXI,
    );

    this.router.delete(
      "/:id",
      authMiddleware,
      authorizationMiddleware(ADMIN_ROLES),
      validateRequest(playingXIIdSchema),
      this.playingXIController.deletePlayingXI,
    );
  }

  getRouter() {
    return this.router;
  }
}

const playingXIRoute = new PlayingXIRoute();

export default playingXIRoute.getRouter();
