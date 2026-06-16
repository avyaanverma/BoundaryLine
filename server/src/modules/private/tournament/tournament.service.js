import TournamentRepository from "../../../repository/tournament.repository.js";
import NotFound from "../../../shared/error/NotFound.js";
import Conflict from "../../../shared/error/Conflict.js";

class TournamentService {
  constructor(tournamentRepository = new TournamentRepository()) {
    this.tournamentRepository = tournamentRepository;
  }

  async getTournaments() {
    return await this.tournamentRepository.findAll();
  }

  async getTournamentById(tournamentId) {
    const tournament = await this.tournamentRepository.findById(tournamentId);

    if (!tournament) {
      throw new NotFound("Tournament Not Found");
    }

    return tournament;
  }

  async createTournament(payload) {
    const existingTournament = await this.tournamentRepository.findOne({
      name: payload.name,
    });

    if (existingTournament) {
      throw new Conflict("Tournament with this name already exists");
    }

    return await this.tournamentRepository.create(payload);
  }

  async updateTournament(tournamentId, payload) {
    const currentTournament = await this.getTournamentById(tournamentId);

    const nextName = payload.name ?? currentTournament.name;

    if (payload.name && nextName !== currentTournament.name) {
      const existingTournament = await this.tournamentRepository.findOne({
        name: nextName,
      });

      if (
        existingTournament &&
        existingTournament._id.toString() !== tournamentId
      ) {
        throw new Conflict("Tournament with this name already exists");
      }
    }

    const updatedTournament = await this.tournamentRepository.updateById(
      tournamentId,
      payload,
    );

    return updatedTournament;
  }

  async deleteTournament(tournamentId) {
    await this.getTournamentById(tournamentId);

    return await this.tournamentRepository.softDeleteById(tournamentId);
  }
}

export default TournamentService;
