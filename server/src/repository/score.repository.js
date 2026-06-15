import { Score } from "../model/score.model.js";

class ScoreRepository {
  async create(payload) {
    return Score.create(payload);
  }
  async findById(id) {
    return Score.findOne({ _id: id, isDeleted: false })
      .populate("matchId")
      .populate("battingTeam");
  }
  async findByMatchId(matchId) {
    return Score.find({
      matchId,
      isDeleted: false,
    }).sort({ createdAt: -1 });
  }
  async updateById(id, payload) {
    return Score.findOneAndUpdate({ _id: id, isDeleted: false }, payload, {
      new: true,
      runValidators: true,
    });
  }
  async softDelete(id) {
    return Score.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true },
    );
  }
}

export default ScoreRepository;
