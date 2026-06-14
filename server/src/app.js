import express from "express";
import env from "./config/env.js";
import morgan from "morgan";
import securityMiddleware from "./middleware/security.middleware.js";
import googleOAuthMiddleware from "./middleware/googleOAuth.middleware.js";
import authRouter from "./modules/auth/auth.route.js";
import userRouter from "./modules/user/user.route.js";
import matchRoute from "./modules/match/match.route.js";
import teamRoute from "./modules/team/team.route.js";
import commentaryRouter from "./modules/commentary/commentary.route.js"
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";


function registerFeatureRoutes(app, prefix) {
    // What: mount the feature routes under one API prefix.
    // Why: frontend clients currently expect `/v1/*`, while backend docs also mention `/api/*`.
    // How: reuse the same route modules for both prefixes so controllers stay single-source.
    app.use(`${prefix}/users`, userRouter);
    app.use(`${prefix}/auth`, authRouter);
    app.use(`${prefix}/teams`, teamRoute);
    app.use(`${prefix}/matches`, matchRoute);
    app.use(`${prefix}/commentary`, commentaryRouter);

}
  
export default function createApp() {
  const app = express();

  // What: enable compact request logging during local development.
  // Why: `morgan("dev")` is noisy and is intended for debugging, not production traffic.
  // How: only attach it when the environment is not production.
  // this code will only work in production
  if (env.NODE_ENV === "development") {
    app.use(morgan(env.MORGAN_LOGGER));
  }

  securityMiddleware(app); // security middleware added
  googleOAuthMiddleware(app); // google auth middleware   
  
  registerFeatureRoutes(app, "/api");
  registerFeatureRoutes(app, "/api/v1");

  /**
   * @method GET
   * @route /health
   * @description to check the status of the server
   * */

  app.get("/health", (req, res) => {
    res.json({
      message: "healthy",
    });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
