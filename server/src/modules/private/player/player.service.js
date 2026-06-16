import Conflict from "../../../shared/error/Conflict.js";
import NotFound from "../../../shared/error/NotFound.js";
import PlayerRepository from "../../../repository/player.repository.js";

class PlayerService {
  constructor(playerRepository = new PlayerRepository()) {
    this.playerRepository = playerRepository;
  }

  async listPlayers(filters = {}) {
    const query = {};

    if (filters.role) {
      query.role = filters.role;
    }

    return this.playerRepository.findAll(query);
  }

  async getPlayerById(playerId) {
    const player = await this.playerRepository.findById(playerId);

    if (!player) {
      throw new NotFound("Player not found");
    }

    return player;
  }

  async createPlayer(payload) {
    await this.ensureUniquePlayerName(payload.name);

    return this.playerRepository.create(payload);
  }

  async updatePlayer(playerId, payload) {
    const currentPlayer = await this.getPlayerById(playerId);
    const nextName = payload.name ?? currentPlayer.name;

    await this.ensureUniquePlayerName(nextName, playerId);

    const updatedPlayer = await this.playerRepository.updateById(
      playerId,
      payload,
    );

    if (!updatedPlayer) {
      throw new NotFound("Player not found");
    }

    return updatedPlayer;
  }

  async deletePlayer(playerId) {
    await this.getPlayerById(playerId);

    const deletedPlayer = await this.playerRepository.softDeleteById(playerId);

    if (!deletedPlayer) {
      throw new NotFound("Player not found");
    }

    return deletedPlayer;
  }

  async ensureUniquePlayerName(name, excludedPlayerId = null) {
    const existingPlayer = await this.playerRepository.findByName(
      name,
      excludedPlayerId,
    );

    if (existingPlayer) {
      throw new Conflict("Player name already exists");
    }
  }
}

export default PlayerService;
