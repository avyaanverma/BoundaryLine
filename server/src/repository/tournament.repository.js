import { TournamentModel } from "../model/tournament.model.js";

class TournamentRepository {
  constructor() {
    this.TournamentModel = TournamentModel;
  }

  async findAll() {
    // What: fetch all active tournaments.
    // Why: list APIs should hide soft-deleted tournaments by default.
    // How: query by `isDeleted:false`, sort chronologically by startDate, and return plain objects.
    return this.TournamentModel.find({ isDeleted: false }).sort({ startDate: 1 }).lean();
  }

  async findById(tournamentId) {
    // What: fetch one active tournament by Mongo ObjectId.
    // Why: services need a single source of truth before returning or mutating a tournament.
    // How: query by `_id` and `isDeleted:false`, then return a plain object.
    return this.TournamentModel.findOne({ _id: tournamentId, isDeleted: false }).lean();
  }

  async findByNameOrShortName(name, shortName, excludedTournamentId = null) {
    // What: look for an active tournament with a matching name or short name.
    // Why: create/update flows must protect unique tournament identity before saving.
    // How: build an `$or` query and optionally exclude the current tournament during updates.
    const query = {
      isDeleted: false,
      $or: [{ name }, { shortName }],
    };

    if (excludedTournamentId) {
      // What: skip the tournament currently being updated.
      // Why: a tournament should be allowed to keep its own existing identity.
      // How: add a Mongo `$ne` filter on `_id`.
      query._id = { $ne: excludedTournamentId };
    }

    return this.TournamentModel.findOne(query).sort({ startDate: 1 }).lean();
  }

  async create(payload) {
    // What: insert a new tournament document.
    // Why: repository owns database writes so service logic stays database-agnostic.
    // How: call Mongoose create, then convert the returned document to a plain object.
    const tournament = await this.TournamentModel.create(payload);

    return tournament.toObject();
  }

  async updateById(tournamentId, payload) {
    // What: update an active tournament document.
    // Why: PATCH APIs need partial updates while preserving soft-delete rules.
    // How: find by `_id` and `isDeleted:false`, then return the updated document.
    return this.TournamentModel.findOneAndUpdate(
      { _id: tournamentId, isDeleted: false },
      payload,
      { new: true, runValidators: true },
    ).lean();
  }

  async softDeleteById(tournamentId) {
    // What: mark a tournament as deleted without removing it from MongoDB.
    // Why: soft-delete keeps audit history and avoids accidental data loss.
    // How: update `isDeleted:true` and return the affected document.
    return this.TournamentModel.findOneAndUpdate(
      { _id: tournamentId, isDeleted: false },
      { isDeleted: true },
      { new: true },
    ).lean();
  }
}

export default TournamentRepository;