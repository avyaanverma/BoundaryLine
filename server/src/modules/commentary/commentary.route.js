import CommentaryController from "./commentary.controller.js";
import express from "express";

const router = express.Router();

const commentaryController = new CommentaryController();

// Controller object

/**
 * POST /api/commentary
 * New commentary create karega
 */
router.post("/", commentaryController.addCommentary);

/**
 * DELETE /api/commentary/:id
 * Commentary delete karega
 */
router.delete("/:id", commentaryController.deleteCommentary);

/**
 * GET /api/commentary/match/:matchId
 * Match ki commentary fetch karega
 */
router.get("/match/:matchId", commentaryController.getCommentaryByMatch);

export default router;
