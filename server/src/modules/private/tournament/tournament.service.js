import TournamentRepository from "../../../repository/tournament.repository.js";
import User from "../../../model/user.model.js";
import NotFound from "../../../shared/error/NotFound.js";
import Forbidden from "../../../shared/error/Forbidden.js";
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

  async createTournament(payload, userId) {
    const existingTournament = await this.tournamentRepository.findByNameOrShortName(payload.name);

    if (existingTournament) {
      throw new Conflict("Tournament with this name already exists");
    }

    const tournamentPayload = {
      ...payload,
      createdBy: userId,
      authorizedScorers: userId ? [userId] : [],
    };

    return await this.tournamentRepository.create(tournamentPayload);
  }

  async assertOwner(tournamentId, user) {
    const tournament = await this.getTournamentById(tournamentId);
    if (user?.role !== "SUPER_ADMIN" && tournament.createdBy.toString() !== user?._id?.toString()) {
      throw new Forbidden("Only the tournament creator can manage this tournament");
    }
    return tournament;
  }

  async updateTournament(tournamentId, payload, user) {
    const currentTournament = await this.assertOwner(tournamentId, user);

    const nextName = payload.name ?? currentTournament.name;

    if (payload.name && nextName !== currentTournament.name) {
      const existingTournament = await this.tournamentRepository.findByNameOrShortName(nextName);

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

  async addScorer(tournamentId, scorerId, user) {
    const tournament = await this.assertOwner(tournamentId, user);
    const scorer = await User.findOne({ _id: scorerId, isDeleted: false }).lean();
    if (!scorer) throw new NotFound("Scorer account not found");
    const scorers = tournament.authorizedScorers || [];
    const scorerStr = scorerId.toString();
    if (!scorers.some((id) => id.toString() === scorerStr)) {
      scorers.push(scorerId);
    }
    return this.tournamentRepository.updateById(tournamentId, {
      authorizedScorers: scorers,
    });
  }

  async addScorerByEmail(tournamentId, email, user) {
    const scorer = await User.findOne({ email: email.toLowerCase(), isDeleted: false }).lean();
    if (!scorer) throw new NotFound("No active account exists for that email");
    return this.addScorer(tournamentId, scorer._id, user);
  }

  async removeScorer(tournamentId, scorerId, user) {
    const tournament = await this.assertOwner(tournamentId, user);
    const scorers = (tournament.authorizedScorers || []).filter(
      (id) => id.toString() !== scorerId.toString(),
    );
    return this.tournamentRepository.updateById(tournamentId, {
      authorizedScorers: scorers,
    });
  }

  async deleteTournament(tournamentId, user) {
    await this.assertOwner(tournamentId, user);

    return await this.tournamentRepository.softDeleteById(tournamentId);
  }
}

export default TournamentService;
