export const SOCKET_EVENTS = {
  // Room Events
  MATCH_JOIN: "match.join",
  MATCH_LEAVE: "match.leave",

  // Match Events
  MATCH_CREATED: "match.created",
  MATCH_UPDATED: "match.updated",
  MATCH_STARTED: "match.started",
  MATCH_COMPLETED: "match.completed",
  MATCH_STATUS_UPDATED: "match.status.updated",

  // Toss Events
  TOSS_COMPLETED: "toss.completed",

  // Playing XI Events
  PLAYING_XI_SUBMITTED: "playingXI.submitted",
  PLAYING_XI_UPDATED: "playingXI.updated",

  // Score Events
  SCORE_CREATED: "score.created",
  SCORE_UPDATED: "score.updated",
  SCORE_DELETED: "score.deleted",

  // Commentary Events
  COMMENTARY_CREATED: "commentary.created",
  COMMENTARY_UPDATED: "commentary.updated",
  COMMENTARY_DELETED: "commentary.deleted",

  // Innings Events
  INNINGS_STARTED: "innings.started",
  INNINGS_COMPLETED: "innings.completed",

  // Over Events
  OVER_COMPLETED: "over.completed",
};
