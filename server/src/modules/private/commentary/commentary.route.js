import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest.js";
import CommentaryController from "./commentary.controller.js";
import {
  createCommentarySchema,
  commentaryIdParamSchema,
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
     * New commentary create karega
     */
    this.router.post(
      "/",
      validateRequest(createCommentarySchema),
      this.commentaryController.addCommentary,
    );

    /**
     * DELETE /api/commentary/:id
     * Commentary delete karega
     */
    this.router.delete(
      "/:id",
      validateRequest(commentaryIdParamSchema),
      this.commentaryController.deleteCommentary,
    );
  }

  getRouter() {
    return this.router;
  }
}

const commentaryRoute = new CommentaryRoute();

export default commentaryRoute.getRouter();
