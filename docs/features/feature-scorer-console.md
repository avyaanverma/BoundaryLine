# CricPulse Feature Document: Scorer Console (Moderator Mode)

## Feature Overview
The CricPulse Scorer Console provides an authenticated Scorer with a streamlined, error-proof button-pad layout to post ball-by-ball updates to millions of concurrent viewers. Includes advanced options for extras, wickets validation steps, projected scorers, real-time strike-rate trend charts, and state undos.

---

## Folder Structure
```
src/features/scorer-console/
├── components/
│   ├── ScorerMatchStatus.tsx      # Tracking active strikers and bowler details
│   ├── ScorerProjectedScore.tsx   # Estimating future tallies
│   └── BatterTrendChart.tsx       # SVG vector graph representing batsman performance
└── pages/
    └── ScorerConsolePage.tsx      # Button mapping controller and prompt modals
```

---

## Components Used
1. **ScorerMatchStatus**: Quick reference info listing active striker configurations, cumulative totals, and active run rates.
2. **ScorerProjectedScore**: Dynamic projections analyzing estimated runs based on current rates or specified rate limits.
3. **BatterTrendChart**: Custom SVG bar charts mapping relative performance rates per over.
4. **ScorerConsolePage**: Primary panel layout grouping numeral keypad scores, extras overlays, wicket flows, and publish live shortcuts.

---

## State Management
- **Redux Slice (`matchSlice.ts`)**:
  - `history`: Acts as a multi-level stack. Every scoring action automatically pushes a deep copy of the match state onto the stack. Selecting "Undo" pops the stack, providing immediate click-error rectification capabilities.
  - `updateBallEvent`: Comprehensive action mutating scores, updating बल्लेबाज stats, adding default commentaries, and rotating striker positions.

---

## API Integration
- **TanStack Mutations (`usePublishScoreMutation`)**:
  - Automatically invalidates client caches and publishes the new ball logs to database routes.
- **Axios Client**: Handles silent automatic request retrying on authentication failure.

---

## Socket Events Used
- `SCORE_UPDATED`: Dispatched on every successful numeric click. This lets all subscribers hear matching live actions within milliseconds.
- `OVER_COMPLETED`: Broadcasts after 6 valid balls are filed.
- `WICKET_FALL`: Signals active wickets.

---

## Known Issues
- Automatic over detection does not prompt for bowling rotation adjustments yet. Strike rotation is handled on odd runs, but needs integration with over changes.

---

## Future Improvements
- Implement voice-activated keypad prompts for hand-free ball scoring.
- Support offline storage state and local sync recovery if connection is broken.
