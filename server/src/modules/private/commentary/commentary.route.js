import { Router } from "express";
import CommentaryController from "./commentary.controller.js";

import { validateRequest } from "../../../middleware/validateRequest.js";

import {
  authenticate,
  authorize,
} from "../../../middleware/auth.middleware.js";

import {
  createCommentarySchema,
  commentaryIdParamSchema,
  getCommentaryByMatchSchema,
} from "../../../validators/commentary.validator.js";

class CommentaryRoute {
  constructor(commentaryController = new CommentaryController()) {
    this.router = Router();
    this.commentaryController = commentaryController;
    this.registerRoutes();
  }

  registerRoutes() {
    /**
     * POST /api/commentary
     * Create commentary
     */
    this.router.post(
      "/",
      authenticate,
      authorize("SUPER_ADMIN", "ADMIN", "SCORER"),
      validateRequest(createCommentarySchema),
      this.commentaryController.addCommentary
    );

    /**
     * GET /api/commentary/match/:matchId
     * Get commentary by match
     */
    this.router.get(
      "/match/:matchId",
      authenticate,
      validateRequest(getCommentaryByMatchSchema),
      this.commentaryController.getCommentaryByMatch
    );

    /**
     * DELETE /api/commentary/:id
     * Delete commentary
     */
    this.router.delete(
      "/:id",
      authenticate,
      authorize("SUPER_ADMIN", "ADMIN"),
      validateRequest(commentaryIdParamSchema),
      this.commentaryController.deleteCommentary
    );
  }

  getRouter() {
    return this.router;
  }
}

const commentaryRoute = new CommentaryRoute();

export default commentaryRoute.getRouter();
