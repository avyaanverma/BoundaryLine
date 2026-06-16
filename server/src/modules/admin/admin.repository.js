import Match from "../../model/match.model.js";
import Player from "../../model/player.model.js";
import Team from "../../model/team.model.js";
import User from "../../model/user.model.js";
import { AdminDashboard } from "./admin.model.js";

class AdminRepository {
  buildMatchFilter({ days, seriesId } = {}) {
    // What: normalize optional admin match filters into one Mongo query.
    // Why: totals and recent lists should describe the same filtered dataset.
    // How: combine soft-delete, optional series, and rolling createdAt window.
    const filter = {
      isDeleted: false,
    };

    if (seriesId) {
      filter.seriesId = seriesId;
    }

    if (days) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      filter.createdAt = {
        $gte: cutoffDate,
      };
    }

    return filter;
  }

  async getAdminStats() {
    // What: fetch the newest dashboard snapshot.
    // Why: the admin UI needs a fast overview without recalculating on every render.
    // How: query the persisted AdminDashboard model and return a plain object.
    return AdminDashboard.findOne({ isDeleted: false }).sort({ createdAt: -1 }).lean();
  }

  async updateAdminStats(data) {
    // What: upsert one dashboard statistics document.
    // Why: keeping one latest snapshot avoids duplicate admin summary rows.
    // How: update the active dashboard row or create it if none exists yet.
    return AdminDashboard.findOneAndUpdate(
      { isDeleted: false },
      { ...data, lastUpdated: new Date() },
      { upsert: true, returnDocument: "after", setDefaultOnInsert: true },
    ).lean();
  }

  async getUserCount() {
    // What: count active users.
    // Why: dashboard metrics should exclude soft-deleted records.
    // How: use the shared isDeleted flag used across models.
    return User.countDocuments({
      isDeleted: false,
    });
  }

  async getPlayerCount() {
    // What: count active players.
    // Why: player totals power the admin overview.
    // How: count only non-deleted player documents.
    return Player.countDocuments({
      isDeleted: false,
    });
  }

  async getTeamCount() {
    // What: count active teams.
    // Why: admins need current team inventory on the dashboard.
    // How: count team documents that are not soft deleted.
    return Team.countDocuments({
      isDeleted: false,
    });
  }

  async getMatchCount(filters = {}) {
    // What: count active matches.
    // Why: match volume is a primary admin dashboard metric.
    // How: count all non-deleted match documents after optional admin filters.
    return Match.countDocuments(this.buildMatchFilter(filters));
  }

  async getCompletedMatchCount(filters = {}) {
    // What: count completed matches.
    // Why: admins need a quick view of finished fixtures.
    // How: filter by status plus shared admin match filters.
    return Match.countDocuments({
      ...this.buildMatchFilter(filters),
      status: "COMPLETED",
    });
  }

  async getLiveMatchCount(filters = {}) {
    // What: count matches currently in live states.
    // Why: the dashboard should surface active operations immediately.
    // How: count LIVE and INNINGS_BREAK statuses after optional admin filters.
    return Match.countDocuments({
      ...this.buildMatchFilter(filters),
      status: {
        $in: ["LIVE", "INNINGS_BREAK"],
      },
    });
  }

  async getRecentMatches(limit = 10, filters = {}) {
    // What: fetch the latest match documents.
    // Why: the admin page displays recent operational activity.
    // How: apply shared filters, sort newest first, cap the list, and populate teams.
    return Match.find(this.buildMatchFilter(filters))
      .populate("team1", "name shortName")
      .populate("team2", "name shortName")
      .sort({
        createdAt: -1,
      })
      .limit(limit)
      .lean();
  }

  async getActiveUsers(days = 7) {
    // What: count recently updated active users.
    // Why: this gives admins a lightweight engagement signal.
    // How: compare updatedAt with a rolling day window.
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return User.countDocuments({
      updatedAt: {
        $gte: cutoffDate,
      },
      isDeleted: false,
    });
  }
}

export default new AdminRepository();
