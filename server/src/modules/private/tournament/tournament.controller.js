import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import TournamentService from "./tournament.service.js";
import { StatusCodes } from "http-status-codes";

class TournamentController {
  constructor(tournamentService = new TournamentService()) {
    this.tournamentService = tournamentService;
  }

  listTournaments = asyncHandler(async (req, res) => {
    const tournaments =
      await this.tournamentService.getTournaments();

    return new ApiResponse(
      StatusCodes.OK,
      "Tournaments fetched successfully",
      tournaments
    ).send(res);
  });

  getTournament = asyncHandler(async (req, res) => {
    const tournament =
      await this.tournamentService.getTournamentById(
        req.validated.params.id
      );

    return new ApiResponse(
      StatusCodes.OK,
      "Tournament fetched successfully",
      tournament
    ).send(res);
  });

  createTournament = asyncHandler(async (req, res) => {
    const tournament =
      await this.tournamentService.createTournament(
        req.validated.body
      );

    return new ApiResponse(
      StatusCodes.CREATED,
      "Tournament created successfully",
      tournament
    ).send(res);
  });

  updateTournament = asyncHandler(async (req, res) => {
    const tournament =
      await this.tournamentService.updateTournament(
        req.validated.params.id,
        req.validated.body
      );

    return new ApiResponse(
      StatusCodes.OK,
      "Tournament updated successfully",
      tournament
    ).send(res);
  });

  deleteTournament = asyncHandler(async (req, res) => {
    const tournament =
      await this.tournamentService.deleteTournament(
        req.validated.params.id
      );

    return new ApiResponse(
      StatusCodes.OK,
      "Tournament deleted successfully",
      tournament
    ).send(res);
  });
}

export default TournamentController;