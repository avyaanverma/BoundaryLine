import PlayingXIRepository from "../../../repository/playingXI.repository.js";
import MatchRepository from "../../../repository/match.repository.js";
import TeamRepository from "../../../repository/team.repository.js";
import SquadRepository from "../../../repository/squad.repository.js";

import NotFound from "../../../shared/error/NotFound.js";
import Conflict from "../../../shared/error/Conflict.js";
import AppError from "../../../shared/error/AppError.js";

class PlayingXIService {
  constructor(
    playingXIRepository = new PlayingXIRepository(),
    matchRepository = new MatchRepository(),
    teamRepository = new TeamRepository(),
    squadRepository = new SquadRepository(),
  ) {
    this.playingXIRepository = playingXIRepository;
    this.matchRepository = matchRepository;
    this.teamRepository = teamRepository;
    this.squadRepository = squadRepository;
  }

  async getPlayingXIs() {
    return this.playingXIRepository.findAll();
  }

  async getPlayingXIById(id) {
    const playingXI = await this.playingXIRepository.findById(id);

    if (!playingXI) {
      throw new NotFound("Playing XI not found");
    }

    return playingXI;
  }

  async createPlayingXI(payload) {
    const { matchId, teamId, players, captain, viceCaptain, wicketKeeper } =
      payload;

    const match = await this.matchRepository.findById(matchId);

    if (!match) {
      throw new NotFound("Match not found");
    }

    const team = await this.teamRepository.findById(teamId);

    if (!team) {
      throw new NotFound("Team not found");
    }

    const existingPlayingXI = await this.playingXIRepository.findByMatchAndTeam(
      matchId,
      teamId,
    );

    if (existingPlayingXI) {
      throw new Conflict("Playing XI already submitted");
    }

    if (players.length !== 11) {
      throw new AppError("Playing XI must contain exactly 11 players", 400);
    }

    const playerSet = new Set(players);

    if (playerSet.size !== players.length) {
      throw new AppError("Duplicate players are not allowed", 400);
    }

    if (!players.includes(captain)) {
      throw new AppError("Captain must be part of Playing XI", 400);
    }

    if (!players.includes(viceCaptain)) {
      throw new AppError("Vice Captain must be part of Playing XI", 400);
    }

    if (!players.includes(wicketKeeper)) {
      throw new AppError("Wicket Keeper must be part of Playing XI", 400);
    }

    const squad = await this.squadRepository.findBySeriesAndTeam(
      match.seriesId,
      teamId,
    );

    if (!squad) {
      throw new NotFound("Squad not found");
    }

    const squadPlayers = squad.players.map((player) => player.toString());

    const invalidPlayers = players.filter(
      (player) => !squadPlayers.includes(player.toString()),
    );

    if (invalidPlayers.length > 0) {
      throw new AppError("All players must belong to squad", 400);
    }

    return this.playingXIRepository.create(payload);
  }

  async updatePlayingXI(id, payload) {
    await this.getPlayingXIById(id);

    return this.playingXIRepository.updateById(id, payload);
  }

  async deletePlayingXI(id) {
    await this.getPlayingXIById(id);

    return this.playingXIRepository.softDeleteById(id);
  }
}

export default PlayingXIService;
