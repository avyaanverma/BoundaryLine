import commentaryService from "./commentary.service.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import ApiResponse from "../../shared/utils/ApiResponse.js";

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

    return new ApiResponse(201, "Commentary added successfully", commentary).send(res);
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

    return new ApiResponse(200, "Commentary fetched successfully", {
      commentaries,
      page: Number(page),
      limit: Number(limit),
    }).send(res);
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

    return new ApiResponse(200, "Commentary deleted successfully", commentary).send(res);
  });
}
