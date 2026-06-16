import http from "http";

import createApp from "./src/app.js";
import connectDB from "./src/config/db.js";
import env from "./src/config/env.js";

import { logger } from "./src/shared/utils/logger.js";

import {
  initializeSocket,
} from "./src/socket/index.js";

function startServer() {
  const app = createApp();

  const server =
    http.createServer(app);

  initializeSocket(server);

  connectDB()
    .then(() => {
      logger.info("database connected.");

      server.listen(env.PORT, () => {
        logger.info(
          `Server listening on http://localhost:${env.PORT}`
        );
      });
    })
    .catch((err) => {
      logger.error(
        "Error in connecting database : ",
        err
      );
    });
}

startServer();