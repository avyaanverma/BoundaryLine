import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest.js";
import SeriesController from "./series.controller.js";
import {
  createSeriesSchema,
  updateSeriesSchema,
  seriesIdSchema,
} from "../../../validators/series.validator.js";
import {
  authMiddleware,
  authorizationMiddleware,
} from "../../../middleware/auth.middleware.js";
import { ROLES } from "../../../constant/role.constant.js";

class SeriesRoute {
  constructor(seriesController = new SeriesController()) {
    this.router = Router();
    this.seriesController = seriesController;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post(
      "/",
      authMiddleware,
      authorizationMiddleware([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
      validateRequest(createSeriesSchema),
      this.seriesController.createSeries,
    );

    this.router.patch(
      "/:id",
      authMiddleware,
      authorizationMiddleware([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
      validateRequest({
        ...seriesIdSchema,
        ...updateSeriesSchema,
      }),
      this.seriesController.updateSeries,
    );

    this.router.delete(
      "/:id",
      authMiddleware,
      authorizationMiddleware([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
      validateRequest(seriesIdSchema),
      this.seriesController.deleteSeries,
    );
  }

  getRouter() {
    return this.router;
  }
}

const seriesRoute = new SeriesRoute();

export default seriesRoute.getRouter();
