import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import PlayerService from "../../private/player/player.service.js";

class PublicPlayerController {
  constructor(playerService = new PlayerService()) {
    this.playerService = playerService;
  }

  listPlayers = asyncHandler(async (req, res) => {
    const players = await this.playerService.listPlayers(req.validated.query);

    return new ApiResponse(
      200,
      "Players fetched successfully",
      players,
    ).send(res);
  });

  getPlayer = asyncHandler(async (req, res) => {
    const player = await this.playerService.getPlayerById(
      req.validated.params.id,
    );

    return new ApiResponse(200, "Player fetched successfully", player).send(
      res,
    );
  });
}

export default PublicPlayerController;
