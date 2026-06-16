import { Router } from "express";
import CommentaryController from "./commentary.controller.js";

import { validateRequest } from "../../../middleware/validateRequest.js";

import {
  authenticate,
  authorize,
} from "../../../middleware/auth.middleware.js";

import {
  createCommentarySchema,
  commentaryParamSchema,
  getCommentaryByMatchSchema,
} from "../../../validators/commentary.validator.js";

class CommentaryRoute {
  constructor(commentaryController = new CommentaryController()) {
    this.router = Router();
    this.commentaryController = commentaryController;

    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post(
      "/",
      authenticate,
      authorize("SUPER_ADMIN", "ADMIN", "SCORER"),
      validateRequest(createCommentarySchema),
      this.commentaryController.addCommentary
    );
    
    this.router.delete(
      "/:id",
      authenticate,
      authorize("SUPER_ADMIN", "ADMIN"),
      validateRequest(commentaryParamSchema),
      this.commentaryController.deleteCommentary
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new CommentaryRoute().getRouter();