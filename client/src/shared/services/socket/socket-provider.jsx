import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socketService from "./socket.js";
import { SOCKET_EVENTS } from "./socket-events.js";
import { SocketContext } from "./socket-context.js";

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const token = useSelector((state) => state.auth?.token || null);

  useEffect(() => {
    // Initialize socket connection using active JWT token
    const socket = socketService.connect(token || undefined);

    const onConnect = () => {
      setIsConnected(true);
      setConnectionStatus("Connected");
    };

    const onDisconnect = () => {
      setIsConnected(false);
      setConnectionStatus("Disconnected");
    };

    const onConnectError = () => {
      setIsConnected(false);
      setConnectionStatus("Connection Failure");
    };

    // Listen to local connection status
    socketService.listen(SOCKET_EVENTS.CONNECT, onConnect);
    socketService.listen(SOCKET_EVENTS.DISCONNECT, onDisconnect);
    socketService.listen(SOCKET_EVENTS.CONNECT_ERROR, onConnectError);

    // Safeguard connection status with initial sync
    if (socket.connected) {
      onConnect();
    }

    return () => {
      socketService.removeListener(SOCKET_EVENTS.CONNECT, onConnect);
      socketService.removeListener(SOCKET_EVENTS.DISCONNECT, onDisconnect);
      socketService.removeListener(SOCKET_EVENTS.CONNECT_ERROR, onConnectError);
      socketService.disconnect();
    };
  }, [token]);

  const joinMatchRoom = (matchId) => {
    console.log(`[BoundaryLine Socket] Joining room for match: ${matchId}`);
    socketService.emit(SOCKET_EVENTS.MATCH_JOIN, { matchId });
  };

  const leaveMatchRoom = (matchId) => {
    console.log(`[BoundaryLine Socket] Leaving room for match: ${matchId}`);
    socketService.emit(SOCKET_EVENTS.MATCH_LEAVE, { matchId });
  };

  const emitScoreUpdate = (matchId, overballData) => {
    console.log(
      `[BoundaryLine Socket] Broad-casting SCORE_UPDATED event`,
      overballData,
    );
    socketService.emit(SOCKET_EVENTS.SCORE_UPDATED, {
      matchId,
      ...overballData,
    });
  };

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        joinMatchRoom,
        leaveMatchRoom,
        emitScoreUpdate,
        connectionStatus,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
