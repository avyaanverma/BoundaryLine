import Team from "../model/team.model.js";

class TeamRepository {
  async findAll() {
    // What: fetch all active teams.
    // Why: list APIs should hide soft-deleted records by default.
    // How: query by `isDeleted:false`, sort by name, and return plain objects.
    return Team.find({ isDeleted: false }).sort({ name: 1 }).lean();
  }

  async findById(teamId) {
    // What: fetch one active team by Mongo ObjectId.
    // Why: services need a single source of truth before returning or mutating teams.
    // How: query by `_id` and `isDeleted:false`, then return a plain object.
    return Team.findOne({ _id: teamId, isDeleted: false }).lean();
  }

  async findByNameOrShortName(name, shortName, excludedTeamId = null) {
    // What: look for an active team with a matching name or short name.
    // Why: create/update flows must protect unique team identity before saving.
    // How: build an `$or` query and optionally exclude the current team during updates.
    const query = {
      isDeleted: false,
      $or: [{ name }, { shortName }],
    };

    if (excludedTeamId) {
      // What: skip the team currently being updated.
      // Why: a team should be allowed to keep its own existing name/shortName.
      // How: add a Mongo `$ne` filter on `_id`.
      query._id = { $ne: excludedTeamId };
    }

    return Team.findOne(query).lean();
  }

  async create(payload) {
    // What: insert a new team document.
    // Why: repository owns database writes so service logic stays database-agnostic.
    // How: call Mongoose create, then convert the returned document to a plain object.
    const team = await Team.create(payload);

    return team.toObject();
  }

  async updateById(teamId, payload) {
    // What: update an active team document.
    // Why: PATCH APIs need partial updates while preserving soft-delete rules.
    // How: find by `_id` and `isDeleted:false`, then return the updated document.
    return Team.findOneAndUpdate(
      { _id: teamId, isDeleted: false },
      payload,
      { new: true, runValidators: true },
    ).lean();
  }

  async softDeleteById(teamId) {
    // What: mark a team as deleted without removing it from MongoDB.
    // Why: soft-delete keeps audit history and avoids accidental data loss.
    // How: update `isDeleted:true` and return the affected document.
    return Team.findOneAndUpdate(
      { _id: teamId, isDeleted: false },
      { isDeleted: true },
      { new: true },
    ).lean();
  }
}

export default TeamRepository;
