import express from "express";
import AdminController from "./admin.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { authenticateRequest, authorizeRoles } from "../../middleware/auth.middleware.js";
import { ROLES } from "../../constant/role.constant.js";
import {
  adminQuerySchema,
  dashboardQuerySchema,
} from "./validators/admin.validators.js";

const router = express.Router();
const controller = new AdminController();
const adminOnly = [
  authenticateRequest,
  authorizeRoles([ROLES.ADMIN, ROLES.SUPER_ADMIN]),
];

/**
 * Dashboard stats
 * GET /api/admin/dashboard
 */
router.get(
  "/dashboard",
  ...adminOnly,
  validateRequest(dashboardQuerySchema),
  controller.getDashboard,
);

/**
 * Match stats
 * GET /api/admin/matches
 */
router.get(
  "/matches",
  ...adminOnly,
  validateRequest(adminQuerySchema),
  controller.getMatchStats,
);

/**
 * User stats
 * GET /api/admin/users
 */
router.get("/users", ...adminOnly, controller.getUserStats);

/**
 * Player stats
 * GET /api/admin/players
 */
router.get("/players", ...adminOnly, controller.getPlayerStats);

/**
 * System health
 * GET /api/admin/health
 */
router.get("/health", ...adminOnly, controller.getSystemHealth);

export default router;
