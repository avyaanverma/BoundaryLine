import adminRepository from "./admin.repository.js";
import AdminDashboardDTO from "./dto/admin.dto.js";
import { logger } from "../../shared/utils/logger.js";

class AdminService {
  constructor() {
    this.adminRepository = adminRepository;
  }

  async getDashboardStats() {
    // What: calculate the latest admin dashboard totals.
    // Why: the admin page should reflect current teams, users, players, and match activity.
    // How: run independent count queries in parallel, then persist one dashboard snapshot.
    logger.info("Computing dashboard statistics");

    const [
      totalUsers,
      totalPlayers,
      totalTeams,
      totalMatches,
      completedMatches,
      activeLiveMatches,
    ] = await Promise.all([
      this.adminRepository.getUserCount(),
      this.adminRepository.getPlayerCount(),
      this.adminRepository.getTeamCount(),
      this.adminRepository.getMatchCount(),
      this.adminRepository.getCompletedMatchCount(),
      this.adminRepository.getLiveMatchCount(),
    ]);

    const statsPayload = {
      totalUsers,
      totalPlayers,
      totalTeams,
      totalMatches,
      completedMatches,
      activeLiveMatches,
    };
    const dashboardStats =
      await this.adminRepository.updateAdminStats(statsPayload);
    logger.info(statsPayload, "Dashboard statistics updated successfully");
    return new AdminDashboardDTO(dashboardStats);
  }

  async getAdminOverview({ refresh = false } = {}) {
    // What: return the latest dashboard snapshot.
    // Why: the frontend can choose fast cached stats or force a refresh.
    // How: recompute when requested or when no snapshot exists yet.
    logger.info("Retrieving admin dashboard overview");

    let stats = refresh ? null : await this.adminRepository.getAdminStats();
    if (!stats || refresh) {
      stats = await this.getDashboardStats();
      return stats;
    }

    return new AdminDashboardDTO(stats);
  }

  async getMatchStats(seriesId = null) {
    // What: collect match-specific admin statistics.
    // Why: admins need live/completed totals and a recent match queue.
    // How: run count and list queries in parallel, preserving the optional series filter for future expansion.
    logger.info({ seriesId }, "Fetching match statistics");
    const [totalMatches, liveMatches, completedMatches, recentMatches] =
      await Promise.all([
        this.adminRepository.getMatchCount(),
        this.adminRepository.getLiveMatchCount(),
        this.adminRepository.getCompletedMatchCount(),
        this.adminRepository.getRecentMatches(10),
      ]);
    return {
      totalMatches,
      liveMatches,
      completedMatches,
      recentMatches,
      seriesId,
    };
  }

  async getUserStats() {
    // What: collect user counts for the admin dashboard.
    // Why: user totals and recent activity help validate platform usage.
    // How: count total active users and users updated in the last seven days.
    logger.info("Fetching user stats");
    const [totalUsers, activeUsers7Days] = await Promise.all([
      this.adminRepository.getUserCount(),
      this.adminRepository.getActiveUsers(7),
    ]);
    return {
      totalUsers,
      activeUsers7Days,
    };
  }

  async getPlayerStats() {
    // What: collect player totals.
    // Why: the dashboard needs an inventory count for cricket profiles.
    // How: delegate the count to the repository layer.
    logger.info("Fetching player stats");

    const totalPlayers = await this.adminRepository.getPlayerCount();
    return {
      totalPlayers,
    };
  }

  async getSystemHealth() {
    // What: return process-level health.
    // Why: controllers can expose a consistent admin system status response.
    // How: include uptime and timestamp without touching the database.
    return {
      status: "healthy",
      uptime: process.uptime(),
      timestamp: new Date(),
    };
  }
}

export default new AdminService();
