import { io } from "socket.io-client";
import { SOCKET_EVENTS } from "./socket-events.js";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "";

const createNoopSocket = () => ({
  connected: false,
  connect: () => {},
  disconnect: () => {},
  emit: () => {},
  off: () => {},
  on: () => {},
  removeAllListeners: () => {},
});

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
    this.localChannel = null;
    this.hasWarnedMissingSocketUrl = false;

    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      try {
        this.localChannel = new window.BroadcastChannel("boundaryline-offline-channel");
        this.localChannel.onmessage = (e) => {
          if (e.data && typeof e.data === "object" && "event" in e.data) {
            const { event, data } = e.data;
            const callbacks = this.listeners.get(event);
            if (callbacks) {
              callbacks.forEach((cb) => {
                try {
                  cb(data);
                } catch (err) {
                  console.warn("[BoundaryLine Local Sync] Callback error:", err);
                }
              });
            }
          }
        };
      } catch (err) {
        console.warn("[BoundaryLine Local Sync] BroadcastChannel initialization failed:", err);
      }
    }
  }

  /**
   * Initializes the socket.io-client connection
   */
  connect(token) {
    if (!SOCKET_URL) {
      if (!this.hasWarnedMissingSocketUrl) {
        console.warn(
          "[BoundaryLine Socket] VITE_SOCKET_URL is not set; realtime socket is running in no-op mode."
        );
        this.hasWarnedMissingSocketUrl = true;
      }

      if (!this.socket) {
        this.socket = createNoopSocket();
      }
      return this.socket;
    }

    if (this.socket) {
      if (this.socket.connected) return this.socket;
      this.socket.connect();
      return this.socket;
    }

    console.log(`[BoundaryLine Socket] Connecting to server at: ${SOCKET_URL}`);

    this.socket = io(SOCKET_URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      auth: {
        token: token || "",
      },
    });

    this.setupInternalHandlers();
    this.rebindListeners();

    return this.socket;
  }

  /**
   * Disconnects the socket client safely
   */
  disconnect() {
    if (!SOCKET_URL) {
      return;
    }

    if (this.socket) {
      console.log("[BoundaryLine Socket] Disconnecting from server");
      this.socket.disconnect();
    }
  }

  /**
   * Emits an event with optional arguments
   */
  emit(event, data) {
    if (this.socket && this.socket.connected) {
      this.socket.emit(event, data);
    }
    // Parallel offline local-sync to guarantee immediate cross-tab/frame score propagation
    if (this.localChannel) {
      try {
        this.localChannel.postMessage({ event, data });
      } catch (error) {
        console.warn("[BoundaryLine Local Sync] Broadcast emit failed:", error);
      }
    }
  }

  /**
   * Subscribes to an event and tracks registration for cleanups
   */
  listen(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);

    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  /**
   * Removes a subscription for a single event or callback
   */
  removeListener(event, callback) {
    if (!callback) {
      this.listeners.delete(event);
      if (this.socket) {
        this.socket.off(event);
      }
      return;
    }

    const callbacks = this.listeners.get(event);
    if (callbacks) {
      const idx = callbacks.indexOf(callback);
      if (idx !== -1) {
        callbacks.splice(idx, 1);
      }
      if (callbacks.length === 0) {
        this.listeners.delete(event);
      }
    }

    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  /**
   * Cleans all active socket event listeners
   */
  cleanup() {
    console.log("[BoundaryLine Socket] Sanitizing socket event listeners");
    if (this.socket) {
      this.socket.removeAllListeners();
    }
    this.listeners.clear();
  }

  /**
   * Re-binds tracked listeners on socket reconnection
   */
  rebindListeners() {
    if (!this.socket) return;
    this.listeners.forEach((callbacks, event) => {
      callbacks.forEach((callback) => {
        this.socket?.on(event, callback);
      });
    });
  }

  setupInternalHandlers() {
    if (!this.socket) return;

    this.socket.on(SOCKET_EVENTS.CONNECT, () => {
      console.log("[BoundaryLine Socket] Connection successfully established.");
    });

    this.socket.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
      console.warn(`[BoundaryLine Socket] Disconnected. Reason: ${reason}`);
    });

    this.socket.on(SOCKET_EVENTS.CONNECT_ERROR, (error) => {
      console.warn("[BoundaryLine Socket] Driver connection warning (resilient local real-time loop operational):", error.message || error);
    });
  }
}

export const useSocket = new SocketService();
export default useSocket;
