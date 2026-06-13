import env from "../config/env.js"
import pino from "pino";
import morgan from "morgan";


const logger_level = env.LOGGER_LEVEL;
export const logger = pino({
    level: logger_level,
    transport: {
         target: "pino-pretty",
         options: {
            colorize: true,
            levelFirst: true,
            translateTime: "HH:MM:ss"
         }
    }
})

