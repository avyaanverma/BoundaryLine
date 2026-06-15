import {Player, User, Team, Match} from "../shared/models/reference.model.js";
import AdminDashboardDTO from "./dto/admin.dto.js";

class AdminRepository {
  // latest admin dashboard stats fetch karenge
  async getAdminStats() {
    return await AdminDashboardDTO.findOne().sort({
      createAt: -1,
    });
  }
  async updateAdminStats(data) {
    return await AdminDashboard.findOneAndUpdate(
      {},
      { ...data, lastUpdated: new Date() },
      { upsert: true, new: true, setDefaultOnInsert: true },
    );
  }
  async getUserCount() {
    return await User.countDocuments({
      isDeleted: false,
    });
  }

  async getPlayerCount() {
    return await Player.countDocuments({
      isDeleted: false,
    });
  }
  async getTeamCount() {
    return await Team.countDocuments({
      isDeleted: false,
    });
  }
  async getMatchCount() {
    return await Match.countDocuments({
      isDeleted: false,
    });
  }
  async getCompletedMatchCount() {
    return await Match.countDocuments({
      status: "COMPLETED",
      isDeleted: false,
    });
  }
  async getLiveMatchCount() {
    return await Match.countDocuments({
      status: {
        $in: ["LIVE", "INNINGS_BREAK"],
      },

      isDeleted: false,
    });
  }
  async getRecentMatches(limit = 10) {
    return await Match.find({
      isDeleted: false,
    })
      .sort({
        createdAt: -1,
      })
      .limit(limit);
  }
  async getActiveUsers(days = 7) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return await User.countDocuments({
      updatedAt: {
        $gte: cutoffDate,
      },
      isDeleted: false,
    });
  }
}

export default new AdminRepository();
