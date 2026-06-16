import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import TournamentService from "../../private/tournament/tournament.service.js";

class PublicTournamentController {
  constructor(tournamentService = new TournamentService()) {
    this.tournamentService = tournamentService;
  }

  listTournaments = asyncHandler(async (_req, res) => {
    const tournaments = await this.tournamentService.getTournaments();

    return new ApiResponse(200, "Tournaments fetched successfully", tournaments).send(res);
  });

  getTournament = asyncHandler(async (req, res) => {
    const tournament = await this.tournamentService.getTournamentById(req.validated.params.id);

    return new ApiResponse(200, "Tournament fetched successfully", tournament).send(res);
  });
}

export default PublicTournamentController;
