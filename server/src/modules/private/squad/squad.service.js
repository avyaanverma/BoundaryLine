import SquadRepository from "../../../repository/squad.repository.js";
import TeamRepository from "../../../repository/team.repository.js";
import SeriesRepository from "../../../repository/series.repository.js";

import NotFound from "../../../shared/error/NotFound.js";
import Conflict from "../../../shared/error/Conflict.js";

class SquadService {
  constructor(
    squadRepository = new SquadRepository(),
    teamRepository = new TeamRepository(),
    seriesRepository = new SeriesRepository(),
  ) {
    this.squadRepository = squadRepository;
    this.teamRepository = teamRepository;
    this.seriesRepository = seriesRepository;
  }

  async getSquads() {
    return this.squadRepository.findAll();
  }

  async getSquadById(squadId) {
    const squad = await this.squadRepository.findById(squadId);

    if (!squad) {
      throw new NotFound("Squad not found");
    }

    return squad;
  }

  async createSquad(payload) {
    const { seriesId, teamId } = payload;

    const series = await this.seriesRepository.findById(seriesId);

    if (!series) {
      throw new NotFound("Series not found");
    }

    const team = await this.teamRepository.findById(teamId);

    if (!team) {
      throw new NotFound("Team not found");
    }

    const existingSquad = await this.squadRepository.findBySeriesAndTeam(
      seriesId,
      teamId,
    );

    if (existingSquad) {
      throw new Conflict("Squad already exists for this team in this series");
    }

    return this.squadRepository.create(payload);
  }

  async updateSquad(squadId, payload) {
    await this.getSquadById(squadId);

    const updatedSquad = await this.squadRepository.updateById(squadId, payload);

    if (!updatedSquad) {
      throw new NotFound("Squad not found");
    }

    return updatedSquad;
  }

  async deleteSquad(squadId) {
    await this.getSquadById(squadId);

    return this.squadRepository.softDeleteById(squadId);
  }
}

export default SquadService;
