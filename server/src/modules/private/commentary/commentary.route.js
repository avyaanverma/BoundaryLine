import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest.js";
import CommentaryController from "./commentary.controller.js";
import {
  createCommentarySchema,
  commentaryIdParamSchema,
} from "../../../validators/commentary.validator.js";
import {
  authMiddleware,
  authorizationMiddleware,
} from "../../../middleware/auth.middleware.js";
import { ROLES } from "../../../constant/role.constant.js";

class CommentaryRoute {
  constructor(commentaryController = new CommentaryController()) {
    this.router = Router();
    this.commentaryController = commentaryController;
    this.registerRoutes();
  }

  registerRoutes() {
    const WRITE_ROLES = [ROLES.SCORER, ROLES.ADMIN, ROLES.SUPER_ADMIN];

    /**
     * POST /api/commentary
     * New commentary create karega
     */
    this.router.post(
      "/",
      authMiddleware,
      authorizationMiddleware(WRITE_ROLES),
      validateRequest(createCommentarySchema),
      this.commentaryController.addCommentary,
    );

    /**
     * DELETE /api/commentary/:id
     * Commentary delete karega
     */
    this.router.delete(
      "/:id",
      authMiddleware,
      authorizationMiddleware([ROLES.ADMIN, ROLES.SUPER_ADMIN]),
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
