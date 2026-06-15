import { Router } from "express";
import SeriesController from "./series.controller.js";

const router = Router();
const seriesController = new SeriesController();

router.get("/", seriesController.listSeries);
router.get("/:id", seriesController.getSeries);
router.post("/", seriesController.createSeries);
router.patch("/:id", seriesController.updateSeries);
router.delete("/:id", seriesController.deleteSeries);

export default router;