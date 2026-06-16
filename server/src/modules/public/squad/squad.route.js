import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest.js";
import PublicSquadController from "./squad.controller.js";
import { squadIdSchema } from "../../../validators/squad.validator.js";

class PublicSquadRoute {
  constructor(squadController = new PublicSquadController()) {
    this.router = Router();
    this.squadController = squadController;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", this.squadController.listSquads);
    this.router.get(
      "/:id",
      validateRequest(squadIdSchema),
      this.squadController.getSquad,
    );
  }

  getRouter() {
    return this.router;
  }
}

const publicSquadRoute = new PublicSquadRoute();

export default publicSquadRoute.getRouter();
