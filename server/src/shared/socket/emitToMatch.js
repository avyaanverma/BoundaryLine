import { logger } from "../utils/logger.js";
let ioInstance = null;

export const setIoInstance = (io) => {
  ioInstance = io;
};

export const emitToMatch = (matchId, event, data) => {
  const room = `match:${matchId}`;
  logger.info({ matchId, event }, `Broadcasting socket event: ${event} to room: ${room}`);
  if (ioInstance) {
    ioInstance.to(room).emit(event, data);
  }
};
