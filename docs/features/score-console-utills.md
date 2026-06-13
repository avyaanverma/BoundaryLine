# Scorer Console Utility Functions
Commit ID: [PENDING]
Feature Added: Cricket Utility Functions and XLSX Validator
Date: 12-06-2026

## Files Added
- src/shared/utils/cricketMath.js
- src/features/scorer-console/utils/xlsxValidator.js

---

## cricketMath.js

### What it does
Pure utility module with all cricket-specific mathematical calculations. No React, no Redux, fully testable in isolation.

### Purpose in application
Single source of truth for CRR, RRR, projected score, and result calculations across the entire app.

### Who can use this
Any developer or component that needs cricket calculations anywhere in the project.

### How to use
```js
import {
  ballsToOvers,
  oversToBalls,
  calculateCRR,
  calculateRRR,
  calculateProjectedScore,
  getMatchResult
} from "../../../shared/utils/cricketMath.js"
```

### Function Reference
| Function | Parameters | Returns | Example |
|---|---|---|---|
| ballsToOvers(balls) | balls: number | string "X.Y" | ballsToOvers(7) → "1.1" |
| oversToBalls(overs) | overs: number | number | oversToBalls(4.3) → 27 |
| calculateCRR(runs, balls) | runs: number, balls: number | number | calculateCRR(60, 24) → 15.00 |
| calculateRRR(target, currentRuns, ballsRemaining) | all numbers | number | calculateRRR(150, 60, 60) → 9.00 |
| calculateProjectedScore(currentRuns, balls, totalBalls) | all numbers | number | calculateProjectedScore(60, 30, 120) → 240 |
| getMatchResult(battingRuns, bowlingRuns, wickets, ballsRemaining, teamName) | mixed | string | returns result string |

### Important Notes
- All functions handle division by zero and return 0 safely
- Negative values are handled and return 0
- No imports required inside this file

---

## xlsxValidator.js

### What it does
Validates and sanitizes raw SheetJS parsed XLSX row data before it is dispatched to Redux.

### Purpose in application
Ensures only clean, valid player data enters the Redux store. Separates validation logic from UI logic.

### Who can use this
Any developer implementing real XLSX upload. When SheetJS is integrated, feed its output directly into processXLSXRows().

### How to use
```js
import {
  validatePlayerRow,
  sanitizePlayerRow,
  processXLSXRows
} from "../utils/xlsxValidator.js"

// For full XLSX processing
const result = processXLSXRows(rawSheetJSRows)
// result.validPlayers → dispatch to Redux
// result.invalidRows → show error UI
```

### Function Reference
| Function | Parameters | Returns |
|---|---|---|
| validatePlayerRow(row) | raw row object | { isValid: boolean, errors: string[] } |
| sanitizePlayerRow(row, index) | raw row object, row index | clean player object { id, name, role } |
| processXLSXRows(rows) | array of raw rows | { validPlayers, invalidRows, totalProcessed, totalValid, totalInvalid } |

### Valid Role Values
BATTER, BOWLER, ALL_ROUNDER, WICKET_KEEPER
