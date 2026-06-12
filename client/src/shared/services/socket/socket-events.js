/**
 * Socket.io event constants for BoundaryLine.
 * Solidified for future backend routing and pub-sub.
 */
export const SOCKET_EVENTS = {
  // Connection Events
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  CONNECT_ERROR: "connect_error",
  RECONNECT_ATTEMPT: "reconnect_attempt",
  RECONNECT_FAILED: "reconnect_failed",

  // Match State Syncing
  MATCH_JOIN: "MATCH_JOIN",
  MATCH_LEAVE: "MATCH_LEAVE",
  MATCH_STARTED: "MATCH_STARTED",
  MATCH_ENDED: "MATCH_ENDED",

  // Scoreboard Update Streams
  SCORE_UPDATED: "SCORE_UPDATED",
  OVER_COMPLETED: "OVER_COMPLETED",
  WICKET_FALL: "WICKET_FALL",
  PLAYER_CHANGED: "PLAYER_CHANGED",
  SCORER_ASSIGNED: "SCORER_ASSIGNED",
  MATCH_PAUSED: "MATCH_PAUSED",
  INNINGS_ENDED: "INNINGS_ENDED",
  COMMENTARY_ADDED: "COMMENTARY_ADDED",
};
