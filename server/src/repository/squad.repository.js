import Squad from "../model/squad.model.js";

const squadPopulate = [
  { path: "seriesId", select: "name format status startDate endDate" },
  { path: "teamId", select: "name shortName logo" },
  { path: "players", select: "name shortName role battingStyle bowlingStyle" },
];

class SquadRepository {
  async findAll(query = {}) {
    return Squad.find({ ...query, isDeleted: false })
      .populate(squadPopulate)
      .sort({ createdAt: -1 })
      .lean();
  }

  async findById(squadId) {
    return Squad.findOne({ _id: squadId, isDeleted: false })
      .populate(squadPopulate)
      .lean();
  }

  async findBySeriesAndTeam(seriesId, teamId, excludedSquadId = null) {
    const query = {
      seriesId,
      teamId,
      isDeleted: false,
    };

    if (excludedSquadId) {
      query._id = { $ne: excludedSquadId };
    }

    return Squad.findOne(query).lean();
  }

  async create(payload) {
    const squad = await Squad.create(payload);

    return Squad.findById(squad._id).populate(squadPopulate).lean();
  }

  async updateById(squadId, payload) {
    return Squad.findOneAndUpdate(
      { _id: squadId, isDeleted: false },
      payload,
      { new: true, runValidators: true },
    )
      .populate(squadPopulate)
      .lean();
  }

  async softDeleteById(squadId) {
    return Squad.findOneAndUpdate(
      { _id: squadId, isDeleted: false },
      { isDeleted: true },
      { new: true },
    )
      .populate(squadPopulate)
      .lean();
  }
}

export default SquadRepository;
