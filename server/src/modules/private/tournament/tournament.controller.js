import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import TournamentService from "./tournament.service.js";

class TournamentController {
  constructor(tournamentService = new TournamentService()) {
    this.tournamentService = tournamentService;
  }

  createTournament = asyncHandler(async (req, res) => {
    const tournament = await this.tournamentService.createTournament(
      req.validated.body,
    );

    return new ApiResponse(
      201,
      "Tournament created successfully",
      tournament,
    ).send(res);
  });

  updateTournament = asyncHandler(async (req, res) => {
    const tournament = await this.tournamentService.updateTournament(
      req.validated.params.id,
      req.validated.body,
    );

    return new ApiResponse(
      200,
      "Tournament updated successfully",
      tournament,
    ).send(res);
  });

  deleteTournament = asyncHandler(async (req, res) => {
    const tournament = await this.tournamentService.deleteTournament(
      req.validated.params.id,
    );

    return new ApiResponse(
      200,
      "Tournament deleted successfully",
      tournament,
    ).send(res);
  });
}

export default TournamentController;
