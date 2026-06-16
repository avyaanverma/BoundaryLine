import createApp from "./src/app.js";
import connectDB from "./src/config/db.js";
import env from "./src/config/env.js";
import { logger } from "./src/shared/utils/logger.js";

function startServer() {
  const app = createApp();
  connectDB()
    .then(() => {
      logger.info("database connected.");
      app.listen(env.PORT, () => {
        logger.info(`Server listening on http://localhost:${env.PORT}`);
      });
    })
    .catch((err) => {
      logger.error("Error in connecting database : ", err);
    });
}

startServer();
