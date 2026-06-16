import adminService from "./admin.service.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import mongoose from "mongoose";

class AdminController {
  constructor() {
    // Service dependency
    this.adminService = adminService;
  }

  /**
   * Dashboard overview stats fetch karega
   * Endpoint: GET /admin/dashboard
   */
  getDashboard = asyncHandler(async (req, res) => {
    // What: return dashboard totals to the admin UI.
    // Why: the UI needs one trusted summary endpoint for core platform counts.
    // How: use includeStats=true to force a fresh count before responding.
    const query = req.validated ? req.validated.query : req.query;
    const stats = await this.adminService.getAdminOverview({
      refresh: query?.includeStats === true,
    });

    return res.status(200).json({
      success: true,
      data: stats,
    });
  });

  /**
   * Match statistics fetch karega
   Endpoint: GET /admin/matches
   */
  getMatchStats = asyncHandler(async (req, res) => {
    // validated query use karega
    const query = req.validated ? req.validated.query : req.query;
    const seriesId = query?.seriesId || null;
    const matchStats = await this.adminService.getMatchStats(seriesId);

    return res.status(200).json({
      success: true,
      data: matchStats,
    });
  });

  /**
   * User statistics fetch karega
   * Endpoint: GET /admin/users
   */
  getUserStats = asyncHandler(async (_req, res) => {
    const userStats = await this.adminService.getUserStats();

    return res.status(200).json({
      success: true,
      data: userStats,
    });
  });

  /**
   * Player statistics fetch karega
   * Endpoint: GET /admin/players
   */
  getPlayerStats = asyncHandler(async (_req, res) => {
    const playerStats = await this.adminService.getPlayerStats();
    return res.status(200).json({
      success: true,
      data: playerStats,
    });
  });

  /**
   * System health check karega
   * Endpoint: GET /admin/health
   */
  getSystemHealth = asyncHandler(async (_req, res) => {
    const mongoStates = [
      "disconnected",
      "connected",
      "connecting",
      "disconnecting",
    ];
    const dbState = mongoose.connection.readyState;
    const health = {
      status: dbState === 1 ? "HEALTHY" : "DEGRADED",
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      database: {
        status: mongoStates[dbState] || "unknown",
        readyState: dbState,
      },
      timestamp: new Date(),
    };
    return res.status(200).json({
      success: true,
      data: health,
    });
  });
}

export default AdminController;
