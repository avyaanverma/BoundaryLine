import express from "express";
import HealthController from "./health.controller.js"

const router = express.Router();

const healthController = new HealthController();
router.get("/", healthController.CheckHealth);

export default router;
