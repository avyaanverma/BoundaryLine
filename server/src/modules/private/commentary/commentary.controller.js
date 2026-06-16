import CommentaryService from "./commentary.service.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";

export default class CommentaryController {
  constructor(commentaryService = new CommentaryService()) {
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
   * Match ke commentary records fetch karega
   * Endpoint: GET /commentary/match/:matchId
   */
  getCommentaryByMatch = asyncHandler(async (req, res) => {
    const { matchId } = req.validated ? req.validated.params : req.params;
    const { limit = 50, page = 1 } = req.validated?.query || req.query;

    const commentaries = await this.commentaryService.getCommentaryByMatch(
      matchId,
      limit,
      page,
    );

    return new ApiResponse(200, "Commentary fetched successfully", commentaries).send(res);
  });

  /**
   * Commentary delete bhi to karna hai
   * ENdpoint: DELTE /commentary/:id
   */
  deleteCommentary = asyncHandler(async (req, res) => {
    const { id } = req.validated ? req.validated.params : req.params;

    const userId = req.user ? req.user._id : null;

    const commentary = await this.commentaryService.deleteCommentary(
      id,
      userId,
    );

    return new ApiResponse(200, "Commentary deleted successfully", commentary).send(res);
  });
}
