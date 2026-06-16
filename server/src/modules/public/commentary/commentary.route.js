import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest.js";
import PublicCommentaryController from "./commentary.controller.js";
import { commentaryParamSchema } from "../../../validators/commentary.validator.js";

class PublicCommentaryRoute {
  constructor(commentaryController = new PublicCommentaryController()) {
    this.router = Router();
    this.commentaryController = commentaryController;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get(
      "/match/:matchId",
      validateRequest(commentaryParamSchema),
      this.commentaryController.getCommentaryByMatch,
    );
  }

  getRouter() {
    return this.router;
  }
}

const publicCommentaryRoute = new PublicCommentaryRoute();

export default publicCommentaryRoute.getRouter();
