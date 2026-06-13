import express from "express";
import env from "./config/env.js";
import morgan from "morgan";
import matchRoute from "./modules/match/match.route.js";
import teamRoute from "./modules/team/team.route.js";
import { errorHandler, notFoundHandler } from "./shared/middleware/errorHandler.js";

function healthHandler(req, res) {
    // What: Return a tiny response that confirms the API process is reachable.
    // Why: This gives developers and deployment checks a cheap endpoint before hitting Mongo-backed routes.
    // How: Send a static JSON payload and avoid any database dependency here.
    res.json({
        message: "healthy"
    });
}

function registerFeatureRoutes(app, prefix) {
    // What: mount the feature routes under one API prefix.
    // Why: frontend clients currently expect `/v1/*`, while backend docs also mention `/api/*`.
    // How: reuse the same route modules for both prefixes so controllers stay single-source.
    app.use(`${prefix}/teams`, teamRoute);
    app.use(`${prefix}/matches`, matchRoute);
}

export default function createApp() {
    // What: Create the Express app instance used by both dev server and tests.
    // Why: Keeping app creation separate from listen/connect makes route wiring importable without side effects.
    // How: Register shared middleware first, feature routes next, and fallback error handling at the end.
    const app = express();

    app.use(express.json());

    if (env.NODE_ENV === "production") {
        app.use(morgan("dev"));
    }

    app.get("/health", healthHandler);

    registerFeatureRoutes(app, "/api");
    registerFeatureRoutes(app, "/v1");

    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
}
