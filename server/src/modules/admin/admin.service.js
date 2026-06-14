import * as adminRepository from "./admin.repository.js";
import { logger } from "../../shared/utils/logger.js";

class AdminService {
  constructor() {
    this.adminRepository = adminRepository;
  }

  //Dashboard statistics nikalega

  async getDashboardStats() {
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
    return dashboardStats;
  }

  // Dashboard overview fetch karega

  async getAdminOverview() {
    logger.info("Retrieving admin dashboard overview");

    let stats = await this.adminRepository.getAdminStats();
    if (!stats) {
      stats = await this.getDashboardStats();
    }
    return stats;
  }

  //Match stats fetch karega
  async getMatchStats(seriesId = null) {
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
  // User Stats fetch karega
  async getUserStats() {
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

  //Player stats fetch karega
  async getPlayerStats() {
    logger.info("Fetching player stats");

    const totalPlayers = await this.adminRepository.getPlayerCount();
    return {
      totalPlayers,
    };
  }

  //Health check
  async getSystemHealth() {
    return {
      status: "healthy",
      uptime: process.uptime(),
      timestamp: new Date(),
    };
  }
}

export default new AdminService;
