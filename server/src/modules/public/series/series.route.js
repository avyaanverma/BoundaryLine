import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest.js";
import PublicSeriesController from "./series.controller.js";
import { seriesIdSchema } from "../../../validators/series.validator.js";

class PublicSeriesRoute {
  constructor(seriesController = new PublicSeriesController()) {
    this.router = Router();
    this.seriesController = seriesController;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", this.seriesController.listSeries);
    this.router.get(
      "/:id",
      validateRequest(seriesIdSchema),
      this.seriesController.getSeries,
    );
  }

  getRouter() {
    return this.router;
  }
}

const publicSeriesRoute = new PublicSeriesRoute();

export default publicSeriesRoute.getRouter();
