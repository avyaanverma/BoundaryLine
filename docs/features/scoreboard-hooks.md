# Scoreboard Hooks
Commit ID: [PENDING]
Feature Added: Scoreboard Derived Stats Hook
Date: 12-06-2026

## Files Added
- src/features/scoreboard/hooks/useMatchDerivedStats.js

---

## useMatchDerivedStats

### What it does
Reads match state from Redux and returns all pre-calculated cricket statistics using memoization.

### Purpose in application
Replaces hardcoded inline CRR/RRR calculations that were inside ScoreboardPage.jsx. Single source of derived stats for the entire scoreboard.

### Who can use this
Any developer building scoreboard widgets, stat cards, analytics panels, or any component that needs live match numbers.

### How to use
```js
import { useMatchDerivedStats } from "../hooks/useMatchDerivedStats.js"

const {
  activeInnings,
  totalBallsBowled,
  totalOvers,
  crr,
  rrr,
  projectedScore,
  target,
  isSecondInnings
} = useMatchDerivedStats()
```

### No props required
This hook reads from Redux directly. Just call it inside any component.

### Return Value Reference
| Value | Type | Description |
|---|---|---|
| activeInnings | object | Current innings object |
| totalBallsBowled | number | Total balls bowled as integer |
| totalOvers | string | Overs in "X.Y" format |
| crr | number | Current run rate rounded to 2 decimals |
| rrr | number | Required run rate (0 in first innings) |
| projectedScore | number | Projected final score based on current rate |
| target | number or null | Target runs (null in first innings) |
| isSecondInnings | boolean | True if currentInningsNum is 2 |

### Important Notes
- Uses useMemo internally — safe to call in frequently re-rendering components
- rrr returns 0 in first innings automatically
- target returns null in first innings automatically
- Depends on match.totalOvers being set correctly in Redux state
