import { PlayingXIModel } from "../model/playingXI.model.js";

class PlayingXIRepository {
  async findAll() {
    return PlayingXIModel
      .find({ isDeleted: false })
      .populate("matchId")
      .populate("teamId")
      .populate("players")
      .populate("captain")
      .populate("viceCaptain")
      .populate("wicketKeeper");
  }

  async findById(id) {
    return PlayingXIModel
      .findOne({
        _id: id,
        isDeleted: false,
      })
      .populate("matchId")
      .populate("teamId")
      .populate("players")
      .populate("captain")
      .populate("viceCaptain")
      .populate("wicketKeeper");
  }

  async findByMatchAndTeam(matchId, teamId) {
    return PlayingXIModel.findOne({
      matchId,
      teamId,
      isDeleted: false,
    });
  }

  async create(payload) {
    return PlayingXIModel.create(payload);
  }

  async updateById(id, payload) {
    return PlayingXIModel.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      payload,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async softDeleteById(id) {
    return PlayingXIModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );
  }
}

export default PlayingXIRepository;