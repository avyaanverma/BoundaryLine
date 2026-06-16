import Player from "../model/player.model.js";

class PlayerRepository {
  async findAll(query = {}) {
    return Player.find({ ...query, isDeleted: false })
      .sort({ name: 1 })
      .lean();
  }

  async findById(playerId) {
    return Player.findOne({ _id: playerId, isDeleted: false }).lean();
  }

  async findByName(name, excludedPlayerId = null) {
    const query = {
      name,
      isDeleted: false,
    };

    if (excludedPlayerId) {
      query._id = { $ne: excludedPlayerId };
    }

    return Player.findOne(query).lean();
  }

  async create(payload) {
    const player = await Player.create(payload);

    return player.toObject();
  }

  async updateById(playerId, payload) {
    return Player.findOneAndUpdate(
      { _id: playerId, isDeleted: false },
      payload,
      { new: true, runValidators: true },
    ).lean();
  }

  async softDeleteById(playerId) {
    return Player.findOneAndUpdate(
      { _id: playerId, isDeleted: false },
      { isDeleted: true },
      { new: true },
    ).lean();
  }
}

export default PlayerRepository;
