import { Router } from "express";

import SquadController from "../../admin/squad/squad.controller.js";

import { validate } from "../../../shared/middlewares/validate.js";

import {
  authMiddleware,
  authorizationMiddleware,
} from "../../../middlewares/auth.middleware.js";

import { ROLES } from "../../../constant/roles.constant.js";

import {
  createSquadSchema,
  updateSquadSchema,
  squadIdSchema,
} from "../../admin/squad/squad.validation.js";

const router = Router();

const squadController = new SquadController();

const ADMIN_ROLES = [
  ROLES.ADMIN,
  ROLES.SUPER_ADMIN,
];

router.post(
  "/",
  authMiddleware,
  authorizationMiddleware(ADMIN_ROLES),
  validate(createSquadSchema),
  squadController.createSquad
);

router.patch(
  "/:id",
  authMiddleware,
  authorizationMiddleware(ADMIN_ROLES),
  validate({
    ...squadIdSchema,
    ...updateSquadSchema,
  }),
  squadController.updateSquad
);

router.delete(
  "/:id",
  authMiddleware,
  authorizationMiddleware(ADMIN_ROLES),
  validate(squadIdSchema),
  squadController.deleteSquad
);

export default router;