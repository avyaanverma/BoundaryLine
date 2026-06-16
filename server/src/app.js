import express from "express";
import env from "./config/env.js";
import morgan from "morgan";
import securityMiddleware from "./middleware/security.middleware.js";
import googleOAuthMiddleware from "./middleware/googleOAuth.middleware.js";
import authRouter from "./modules/public/auth/auth.route.js";
import publicPlayerRoute from "./modules/public/player/player.route.js";
import publicTeamRoute from "./modules/public/team/team.route.js";
import publicMatchRoute from "./modules/public/match/match.route.js";
import publicSeriesRoute from "./modules/public/series/series.route.js";
import publicTournamentRoute from "./modules/public/tournament/tournament.route.js";
import publicCommentaryRoute from "./modules/public/commentary/commentary.route.js";
import publicSquadRoute from "./modules/public/squad/squad.route.js";
import publicScoreRoute from "./modules/public/score/score.route.js";
import publicPlayingXIRoute from "./modules/public/playingXI/playingXI.route.js";
import userRouter from "./modules/private/user/user.route.js";
import healthRouter from "./modules/public/health/health.route.js";
import matchRoute from "./modules/private/match/match.route.js";
import privatePlayerRoute from "./modules/private/player/player.route.js";
import teamRoute from "./modules/private/team/team.route.js";
import seriesRoute from "./modules/private/series/series.route.js";
import tournamentRoute from "./modules/private/tournament/tournament.route.js";
import commentaryRouter from "./modules/private/commentary/commentary.route.js";
import squadRoute from "./modules/private/squad/squad.route.js";
import scoreRoute from "./modules/private/score/score.route.js";
import playingXIRoute from "./modules/private/playingXI/playingXI.route.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error.middleware.js";

function registerFeatureRoutes(app, prefix) {
  // What: mount the feature routes under one API prefix.
  // Why: frontend clients currently expect `/v1/*`, while backend docs also mention `/api/*`.
  // How: reuse the same route modules for both prefixes so controllers stay single-source.
  app.use(`${prefix}/users`, userRouter);
  app.use(`${prefix}/auth`, authRouter);
  app.use(`${prefix}/players`, publicPlayerRoute);
  app.use(`${prefix}/private/players`, privatePlayerRoute);
  app.use(`${prefix}/teams`, publicTeamRoute);
  app.use(`${prefix}/private/teams`, teamRoute);
  app.use(`${prefix}/matches`, publicMatchRoute);
  app.use(`${prefix}/private/matches`, matchRoute);
  app.use(`${prefix}/series`, publicSeriesRoute);
  app.use(`${prefix}/private/series`, seriesRoute);
  app.use(`${prefix}/tournaments`, publicTournamentRoute);
  app.use(`${prefix}/private/tournaments`, tournamentRoute);
  app.use(`${prefix}/commentary`, publicCommentaryRoute);
  app.use(`${prefix}/private/commentary`, commentaryRouter);
  app.use(`${prefix}/squads`, publicSquadRoute);
  app.use(`${prefix}/private/squads`, squadRoute);
  app.use(`${prefix}/scores`, publicScoreRoute);
  app.use(`${prefix}/private/scores`, scoreRoute);
  app.use(`${prefix}/playing-xis`, publicPlayingXIRoute);
  app.use(`${prefix}/private/playing-xis`, playingXIRoute);
  app.use('/health', healthRouter);
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

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
