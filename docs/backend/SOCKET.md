# Socket.IO Architecture

> **Real-Time Communication | Match Rooms | Event-Based Broadcasting | CORS-Enabled**

---

## 11. Socket Architecture

BoundaryLine uses **Socket.IO** for real-time, bidirectional communication between the server and connected clients. The system is designed for high-concurrency match broadcasting with room-based isolation.

### Architecture Overview

```
┌──────────────┐     Socket.IO Server      ┌──────────────┐
│  Scorer App  │──────────────────────────►│              │
│  (Admin)     │   POST /private/scores    │   Express    │
└──────────────┘                           │   Server     │
                                           │              │
┌──────────────┐                           │  ┌────────┐ │
│  Scoreboard  │◄──── Socket Broadcast─────│  │Socket.IO│ │
│  (Viewers)   │   match:room123           │  │ Server  │ │
└──────────────┘                           │  └────────┘ │
                                           └──────────────┘
```

### Server Initialization

```js
// server.js
const server = http.createServer(app);
initializeSocket(server);
connectDB().then(() => server.listen(PORT));
```

```js
// socket/index.js
io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  },
});
```

### Room-Based Architecture

Each match has a dedicated room (`match:{matchId}`). Clients join to receive match-specific updates:

```js
// Client joins match room
socket.on(SOCKET_EVENTS.MATCH_JOIN, (data) => {
  socket.join(`match:${data.matchId}`);
});

// Client leaves match room
socket.on(SOCKET_EVENTS.MATCH_LEAVE, (data) => {
  socket.leave(`match:${data.matchId}`);
});
```

### Socket Event Constants

```js
SOCKET_EVENTS = {
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
```

---

## 24. Real-Time Communication Flow

### Score Update Flow

```
1. Scorer clicks run button (e.g., "4 runs")
       │
2. Frontend → POST /api/private/scores
   Body: { matchId, innings, battingTeam, score: 4, ... }
       │
3. ScoreService.createScore()
   ├── ensureLiveMatch(matchId) → match must be LIVE or INNINGS_BREAK
   ├── ScoreRepository.create(payload)
   └── emitToMatch(matchId, SCORE_CREATED, score)
       │
4. emitToMatch calls:
   io.to(`match:${matchId}`).emit("score.created", scoreData)
       │
5. All connected viewers in the match room receive the update
   └── Frontend re-renders scoreboard in real-time
```

### Match Status Change Flow

```
1. Admin updates match status: UPCOMING → LIVE
   PATCH /api/private/matches/:id  { status: "LIVE" }
       │
2. MatchService.updateMatch()
   ├── Update match in database
   ├── emitToMatch(matchId, MATCH_STATUS_UPDATED, { matchId, status: "LIVE" })
   ├── emitToMatch(matchId, MATCH_STARTED, { matchId, status: "LIVE" })
   └── emitToMatch(matchId, INNINGS_STARTED, { matchId, inningsNumber: 1 })
       │
3. Connected viewers see match go LIVE in real-time
```

### Commentary Flow

```
1. Scorer adds ball-by-ball commentary
   POST /api/private/commentary
   Body: { matchId, over, ball, text, runsScored, ... }
       │
2. CommentaryService.addCommentary()
   ├── ensureLiveMatch(matchId)
   ├── commentaryRepository.create(payload)
   └── emitToMatch(matchId, COMMENTARY_CREATED, commentary)
       │
3. Viewers receive new commentary entry instantly
```

### Event Emission Utility

```js
// shared/socket/emitToMatch.js
export const emitToMatch = (matchId, event, data) => {
  const room = `match:${matchId}`;
  if (ioInstance) {
    ioInstance.to(room).emit(event, data);
  }
};
```

### Frontend Socket Integration

```jsx
// SocketProvider wraps the app
<SocketProvider>
  <AppRoutes />
</SocketProvider>

// Hook usage in scoreboard:
socket.emit("match.join", { matchId });
socket.on("score.created", (data) => {
  // Update Redux store with new score
});
socket.on("commentary.created", (data) => {
  // Append to commentary feed
});
socket.on("match.status.updated", (data) => {
  // Update match status display
});
```

---

## Socket Event Mapping

| Service Method | Socket Event Triggered |
|---------------|----------------------|
| `MatchService.createMatch()` | `match.created` |
| `MatchService.updateMatch()` | `match.updated`, `match.status.updated`, `match.started`, `innings.started`, `innings.completed`, `match.completed`, `toss.completed` |
| `ScoreService.createScore()` | `score.created` |
| `ScoreService.updateScore()` | `score.updated`, `over.completed` |
| `ScoreService.deleteScore()` | `score.deleted` |
| `CommentaryService.addCommentary()` | `commentary.created` |
| `CommentaryService.deleteCommentary()` | `commentary.deleted` |
| `PlayingXIService.createPlayingXI()` | `playingXI.submitted` |
| `PlayingXIService.updatePlayingXI()` | `playingXI.updated` |
