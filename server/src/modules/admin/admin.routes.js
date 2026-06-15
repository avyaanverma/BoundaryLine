import express from "express";
import AdminController from "./admin.controller.js";

import { validateRequest } from "../../shared/middleware/validateRequest.js";

import {
  adminQuerySchema,
  dashboardQuerySchema,
} from "./validators/admin.validators.js";

const router = express.Router();
const controller = new AdminController();

/**
 * Dashboard stats
 * GET /api/admin/dashboard
 */
router.get("/dashboard", validateRequest(dashboardQuerySchema), controller.getDashboard);

/**
 * Match stats
 * GET /api/admin/matches
 */
router.get("/matches", validateRequest(adminQuerySchema), controller.getMatchStats);

/**
 * User stats
 * GET /api/admin/users
 */
router.get("/users", controller.getUserStats);

/**
 * Player stats
 * GET /api/admin/players
 */
router.get("/players", controller.getPlayerStats);

/**
 * System health
 * GET /api/admin/health
 */
router.get("/health", controller.getSystemHealth);

export default router;
