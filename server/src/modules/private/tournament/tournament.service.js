import TournamentRepository from "../../../repository/tournament.repository";
import NotFound from "../../../shared/error/NotFound";
import Conflict from "../../../shared/error/Conflict";

class TournamentService {
    constructor() {
        this.tournamentRepository = TournamentRepository;
    }

    async getTournaments() {
        return await this.tournamentRepository.findAll();
    }

    async getTournamentById(tournamentId) {
        const tournament =
            await this.tournamentRepository.findById(
                tournamentId
            );

        if (!tournament) {
            throw new NotFound("Tournament Not Found");
        }

        return tournament;
    }

    async createTournament(payload) {

        const existingTournament =
            await this.tournamentRepository.findOne({
                name: payload.name
            });

        if (existingTournament) {
            throw new Conflict(
                "Tournament with this name already exists"
            );
        }

        return await this.tournamentRepository.create(
            payload
        );
    }

    async updateTournament(
        tournamentId,
        payload
    ) {

        const currentTournament =
            await this.tournamentRepository.findById(
                tournamentId
            );

        if (!currentTournament) {
            throw new NotFound(
                "Tournament Not Found"
            );
        }

        const nextName =
            payload.name ?? currentTournament.name;

        if (
            payload.name &&
            nextName !== currentTournament.name
        ) {
            const existingTournament =
                await this.tournamentRepository.findOne({
                    name: nextName
                });

            if (
                existingTournament &&
                existingTournament._id.toString() !==
                    tournamentId
            ) {
                throw new Conflict(
                    "Tournament with this name already exists"
                );
            }
        }

        const updatedTournament =
            await this.tournamentRepository.updateById(
                tournamentId,
                payload
            );

        return updatedTournament;
    }

    async deleteTournament(
        tournamentId
    ) {

        const currentTournament =
            await this.tournamentRepository.findById(
                tournamentId
            );

        if (!currentTournament) {
            throw new NotFound(
                "Tournament Not Found"
            );
        }

        return await this.tournamentRepository.softDeleteById(
            tournamentId
        );
    }
}

export default new TournamentService();