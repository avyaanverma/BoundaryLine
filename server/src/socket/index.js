import { Server } from "socket.io";
import env from "../config/env.js";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: env.CORS_ORIGIN,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`Socket Connected: ${socket.id}`);

    socket.on("join-match", (data) => {
      const room = `match:${data.matchId}`;

      socket.join(room);

      console.log(`${socket.id} joined room: ${room}`);
    });

    socket.on("leave-match", (data) => {
      const room = `match:${data.matchId}`;

      socket.leave(room);

      console.log(`${socket.id} left room: ${room}`);
    });

    socket.on("disconnect", () => {
      console.log(`Socket Disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized");
  }

  return io;
};
