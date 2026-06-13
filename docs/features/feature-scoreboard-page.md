# CricPulse Feature Document: Scoreboard Page (Viewer Mode)

## Feature Overview
The CricPulse Live Scoreboard view is designed for public viewers to follow a match with high fidelity. It presents real-time ball outcomes, live commentary streams, AI-driven match-up metrics, win probability meters, top performers, and dynamic scorecards. All data on this page is reactive to local Redux store mutations triggered by the Scorer Panel, simulating a real-time pub-sub synchronized system.

---

## Folder Structure
```
src/features/scoreboard/
├── components/
│   ├── LiveMatchHeader.tsx     # Handles match select and connection metrics
│   ├── OverTimeline.tsx        # Colored circular pills denoting run outcomes
│   ├── WinProbability.tsx      # Dual-shaded sliding probability meter
│   ├── TopPerformers.tsx       # Highlights top batsmen and bowlers
│   ├── LiveCommentary.tsx      # Staggered entry animation commentary logs
│   ├── ScorecardTab.tsx        # Fully tabbed batting and bowling results
│   ├── PlayingXITab.tsx        # Team listings and squad confirmations
│   ├── AiInsights.tsx          # Real-time advisory insights
│   └── MatchNews.tsx           # Breaking match cards
└── pages/
    └── ScoreboardPage.tsx      # Main layout grid container
```

---

## Components Used
1. **LiveMatchHeader**: Manages live match selectors and diagnostic connection indicators.
2. **OverTimeline**: Leverages high contrast visual styling matching professional live feeds (e.g. green boundaries, red wickets, amber extras).
3. **WinProbability**: Elegant dual transition bar graphing and calculating relative win percentages in real-time.
4. **TopPerformers**: Visual highlights displaying top batsmen and bowling figures.
5. **LiveCommentary**: Dynamic motion timeline listing full match logs.
6. **ScorecardTab**: Interactive tabular layout featuring full strike rate and economy estimations.
7. **AiInsights**: Dual informational blocks highlighting micro conditions.

---

## State Management
- **Redux Slice (`matchSlice.ts`)**:
  - `currentMatch`: Global state holding the active match details.
  - Controls strike rotation, scoreboard details updates, extras calculations, and commentary appending.

---

## API Integration
- **TanStack Query custom hooks (`useQueries.ts`)**:
  - `useLiveMatchQuery`: Pulls and caches live statistics with a fallback to Redux state on local network failure.
  - `useMatchesQuery`: Populates alternate match options list.
  - Uses a modular `apiClient` Axios instance configured with robust bearer authentication logic.

---

## Socket Events Used
- `MATCH_JOIN`: Connects the viewer to a specific match streaming broadcast room.
- `MATCH_LEAVE`: Disconnects the viewer room.
- `SCORE_UPDATED`: Listened to for real-time live score progress updates.
- `COMMENTARY_ADDED`: Feeds new comments instantly into the scrolling timeline.

---

## Known Issues
- Real-time WebSockets will remain dormant until the backend integration environment completes successfully.
- Refresh token calls in Axios interceptor are currently mocked.

---

## Future Improvements
- Implement interactive SVG wagon wheels for batters.
- Push real audio commentaries on milestones or wicket events.
