import { Server } from "socket.io";
import env from "../config/env.js";
import { SOCKET_EVENTS } from "../constant/socket-events.constant.js";
import { setIoInstance } from "../shared/socket/emitToMatch.js";

let io;

export const initializeSocket = (server) => {
  // Parse comma-separated CORS origins into an array for socket.io
  const origins = env.CORS_ORIGIN.split(",").map((o) => o.trim()).filter(Boolean);

  io = new Server(server, {
    cors: {
      origin: origins,
      credentials: true,
    },
  });

  // Register the io instance so emitToMatch can broadcast to rooms
  setIoInstance(io);

  io.on("connection", (socket) => {
    console.log(`[Socket Connected] ${socket.id}`);

    // Client joins a match room to receive real-time updates
    socket.on(SOCKET_EVENTS.MATCH_JOIN, (data) => {
      const room = `match:${data.matchId}`;
      socket.join(room);
      console.log(`[Socket] ${socket.id} joined room: ${room}`);
    });

    // Client leaves a match room
    socket.on(SOCKET_EVENTS.MATCH_LEAVE, (data) => {
      const room = `match:${data.matchId}`;
      socket.leave(room);
      console.log(`[Socket] ${socket.id} left room: ${room}`);
    });

    socket.on("disconnect", () => {
      console.log(`[Socket Disconnected] ${socket.id}`);
    });
  });

  console.log("[Socket.IO] Server initialized with CORS origins:", origins);

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized");
  }

  return io;
};
