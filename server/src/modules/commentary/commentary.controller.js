import commentaryService from "./commentary.service.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";

import express from "express";
import { success } from "zod";
import data from "../../config/env.js";

export default class CommentaryController {
  constructor() {
    this.commentaryService = commentaryService;
  }
  /**
   * new commentary create karega
   * Endpotin : POST /commentary
   */
  addCommentary = asyncHandler(async (req, res) => {
    const commentaryData = req.validated ? req.validated.body : req.body;

    const userId = req.user ? req.user._id : null;

    const commentary = await this.commentaryService.addCommentary(
      commentaryData,
      userId,
    );

    return res.status(201).json({
      success: true,
      mesage: "Commmentary added successfully",
      data: commentary,
    });
  });

  /**
   * Match ki commentary fetch karta hai
   *
   * Endpoint:
   * GET /commentary/match/:matchId
   */
  getCommentaryByMatch = asyncHandler(async (req, res) => {
    const { matchId } = req.validated ? req.validated.params : req.params;

    const page = req.validated?.query?.page || req.query.page || 1;

    const limit = req.validated?.limit || req.query.limit || 50;

    const commentaries = await this.commentaryService.getCommentaryByMatch(
      matchId,
      Number(limit),
      Number(page),
    );

    return res.status(200).json({
      success: true,
      data: commentaries,
      page: Number(page),
      limit: Number(limit),
    });
  });

  /**
   * Commentary delete bhi to karna hai
   * ENdpoint: DELTE /commentary/:id
   */
  deleteCommentary = asyncHandler(async (req, res) => {
    const { id } = req.validated ? req.validated.params : null;

    const userId = req.user ? req.user._id : null;

    const commentary = await this.commentaryService.deleteCommentary(
      id,
      userId,
    );

    return res.status.json({
      success: true,
      mesage: "Commentary deleted sucessfully",
      data: commentary,
    });
  });
}
