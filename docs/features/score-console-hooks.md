# Scorer Console Custom Hooks
Commit ID: [PENDING]
Feature Added: Scorer Console Custom Hooks Extraction
Date: 12-06-2026

## Files Added
- src/features/scorer-console/hooks/useWicketFlow.js
- src/features/scorer-console/hooks/useMatchSetup.js
- src/features/scorer-console/hooks/useRosterImporter.js

---

## useWicketFlow

### What it does
Manages all wicket dismissal flow state and logic. Handles wicket type selection, batter out tracking, fielder/keeper assignment, and incoming batter selection.

### Purpose in application
Extracted from ScorerConsolePage.jsx to keep the page component clean. Opens the wicket modal with pre-filled state and dispatches the dismissal to Redux on confirmation.

### Who can use this
Any developer building a scoring interface that needs wicket dismissal flow.

### How to use
```js
import { useWicketFlow } from "../hooks/useWicketFlow.js"

const {
  wicketType, setWicketType,
  outBatterId, setOutBatterId,
  fielderId, setFielderId,
  keeperId, setKeeperId,
  newBatterId, setNewBatterId,
  initWicketFlow,
  confirmWicket
} = useWicketFlow({ match, activeInnings, dispatch, setActiveModal })
```

### Required Props
| Prop | Type | Description |
|---|---|---|
| match | object | Current match object from Redux |
| activeInnings | object | Current innings from match.innings array |
| dispatch | function | Redux dispatch function |
| setActiveModal | function | Modal state setter from parent page |

### Exposed Functions
| Function | Description |
|---|---|
| initWicketFlow() | Opens WICKET_FLOW modal with pre-filled striker and bowler |
| confirmWicket() | Validates and dispatches commitWicketState to Redux |

---

## useMatchSetup

### What it does
Manages the complete 5-step match setup wizard state including toss configuration, dynamic match creation, and opening player role assignments.

### Purpose in application
Extracted from ScorerConsolePage.jsx. Drives the setup wizard before a match goes live.

### Who can use this
Any developer building a match creation flow or setup wizard screen.

### How to use
```js
import { useMatchSetup } from "../hooks/useMatchSetup.js"

const {
  setupStep, setSetupStep,
  tossWinner, setTossWinner,
  tossDecision, setTossDecision,
  wizardStrikerId, wizardNonStrikerId, wizardBowlerId,
  handleCreateDynamicMatch,
  initWizardOpeningRoles,
  handleStartMatch
} = useMatchSetup({ match, selectedXI_A, selectedXI_B, dispatch })
```

### Required Props
| Prop | Type | Description |
|---|---|---|
| match | object | Current match object from Redux |
| selectedXI_A | array | Selected playing 11 for Team A |
| selectedXI_B | array | Selected playing 11 for Team B |
| dispatch | function | Redux dispatch function |

### Exposed Functions
| Function | Description |
|---|---|
| handleCreateDynamicMatch(e) | Creates a new dynamic match and advances to step 2 |
| initWizardOpeningRoles() | Pre-fills striker, non-striker, bowler from selected XI |
| handleStartMatch() | Validates all setup data and dispatches startMatchSetup |

---

## useRosterImporter

### What it does
Handles both manual single player entry and bulk XLSX import simulation. Manages player name and role input state.

### Purpose in application
Extracted from ScorerConsolePage.jsx. When real SheetJS XLSX parsing is implemented, only this hook needs updating.

### Who can use this
Any developer building roster management, player registration, or bulk import features.

### How to use
```js
import { useRosterImporter } from "../hooks/useRosterImporter.js"

const {
  newPlayerName, setNewPlayerName,
  newPlayerRole, setNewPlayerRole,
  handleAddManualPlayer,
  handleXLSXImportSimulation
} = useRosterImporter({ match, dispatch })
```

### Required Props
| Prop | Type | Description |
|---|---|---|
| match | object | Current match object from Redux (needs teamA.id, teamB.id) |
| dispatch | function | Redux dispatch function |

### Exposed Functions
| Function | Description |
|---|---|
| handleAddManualPlayer("A" or "B") | Adds single player to team roster in Redux |
| handleXLSXImportSimulation("A" or "B") | Bulk imports 11 mock players into team roster |
