import { Router } from "express";

import SeriesController from "./series.controller.js";

import { validate } from "../../../shared/middlewares/validate.js";

import {
  authMiddleware,
  authorizationMiddleware,
} from "../../../middlewares/auth.middleware.js";

import {
  createSeriesSchema,
  updateSeriesSchema,
  seriesIdSchema,
} from "./series.validation.js";

import { ROLES } from "../../../constant/roles.constant.js";

const router = Router();

const seriesController = new SeriesController();

/**
 * Public Routes
 */

router.get(
  "/",
  seriesController.listSeries
);

router.get(
  "/:id",
  validate(seriesIdSchema),
  seriesController.getSeries
);

/**
 * Protected Routes
 */

router.post(
  "/",
  authMiddleware,
  authorizationMiddleware([
    ROLES.SUPER_ADMIN,
    ROLES.ADMIN,
  ]),
  validate(createSeriesSchema),
  seriesController.createSeries
);

router.patch(
  "/:id",
  authMiddleware,
  authorizationMiddleware([
    ROLES.SUPER_ADMIN,
    ROLES.ADMIN,
  ]),
  validate({
    ...seriesIdSchema,
    ...updateSeriesSchema,
  }),
  seriesController.updateSeries
);

router.delete(
  "/:id",
  authMiddleware,
  authorizationMiddleware([
    ROLES.SUPER_ADMIN,
    ROLES.ADMIN,
  ]),
  validate(seriesIdSchema),
  seriesController.deleteSeries
);

export default router;