import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import PlayingXIService from "../../private/playingXI/playingXI.service.js";

class PublicPlayingXIController {
  constructor(playingXIService = new PlayingXIService()) {
    this.playingXIService = playingXIService;
  }

  listPlayingXIs = asyncHandler(async (_req, res) => {
    const playingXIs = await this.playingXIService.getPlayingXIs();

    return new ApiResponse(200, "Playing XIs fetched successfully", playingXIs).send(res);
  });

  getPlayingXI = asyncHandler(async (req, res) => {
    const playingXI = await this.playingXIService.getPlayingXIById(req.validated.params.id);

    return new ApiResponse(200, "Playing XI fetched successfully", playingXI).send(res);
  });
}

export default PublicPlayingXIController;
