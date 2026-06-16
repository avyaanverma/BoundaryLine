import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import PlayingXIService from "./playingXI.service.js";

class PlayingXIController {
  constructor(playingXIService = new PlayingXIService()) {
    this.playingXIService = playingXIService;
  }

  createPlayingXI = asyncHandler(async (req, res) => {
    const playingXI = await this.playingXIService.createPlayingXI(
      req.validated.body,
    );

    return new ApiResponse(
      201,
      "Playing XI created successfully",
      playingXI,
    ).send(res);
  });

  updatePlayingXI = asyncHandler(async (req, res) => {
    const playingXI = await this.playingXIService.updatePlayingXI(
      req.validated.params.id,
      req.validated.body,
    );

    return new ApiResponse(
      200,
      "Playing XI updated successfully",
      playingXI,
    ).send(res);
  });

  deletePlayingXI = asyncHandler(async (req, res) => {
    const playingXI = await this.playingXIService.deletePlayingXI(
      req.validated.params.id,
    );

    return new ApiResponse(
      200,
      "Playing XI deleted successfully",
      playingXI,
    ).send(res);
  });
}

export default PlayingXIController;
