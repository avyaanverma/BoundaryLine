# Scorer Console Sub-Components
Commit ID: [PENDING]
Feature Added: Scorer Console JSX Breakdown into Sub-Components
Date: 12-06-2026

## Files Added
- src/features/scorer-console/components/SetupWizard.jsx
- src/features/scorer-console/components/LiveScoringPanel.jsx
- src/features/scorer-console/components/ScorerModals.jsx

---

## SetupWizard

### What it does
Renders the complete 5-step match setup flow: Match Selection, Roster Builder, Toss Configuration, Playing XI Confirmation, and Opening Role Assignment.

### Purpose in application
Shown when match.matchPhase === "SETUP". Allows scorer to configure everything before going live.

### Who can use this
Any developer building a pre-match configuration screen or tournament setup flow.

### How to use
```jsx
import SetupWizard from "../components/SetupWizard.jsx"

<SetupWizard
  match={match}
  matchesList={matchesList}
  dispatch={dispatch}
  currentRosterA={currentRosterA}
  currentRosterB={currentRosterB}
  selectedXI_A={selectedXI_A}
  selectedXI_B={selectedXI_B}
  setSelectedXI_A={setSelectedXI_A}
  setSelectedXI_B={setSelectedXI_B}
  setActiveModal={setActiveModal}
  setupStep={setupStep}
  setSetupStep={setSetupStep}
  tossWinner={tossWinner}
  setTossWinner={setTossWinner}
  tossDecision={tossDecision}
  setTossDecision={setTossDecision}
  newMatchTitle={newMatchTitle}
  setNewMatchTitle={setNewMatchTitle}
  newTeamAName={newTeamAName}
  setNewTeamAName={setNewTeamAName}
  newTeamBName={newTeamBName}
  setNewTeamBName={setNewTeamBName}
  newPlayerName={newPlayerName}
  setNewPlayerName={setNewPlayerName}
  newPlayerRole={newPlayerRole}
  setNewPlayerRole={setNewPlayerRole}
  wizardStrikerId={wizardStrikerId}
  setWizardStrikerId={setWizardStrikerId}
  wizardNonStrikerId={wizardNonStrikerId}
  setWizardNonStrikerId={setWizardNonStrikerId}
  wizardBowlerId={wizardBowlerId}
  setWizardBowlerId={setWizardBowlerId}
  handleCreateDynamicMatch={handleCreateDynamicMatch}
  handleAddManualPlayer={handleAddManualPlayer}
  handleXLSXImportSimulation={handleXLSXImportSimulation}
  initWizardOpeningRoles={initWizardOpeningRoles}
  handleStartMatch={handleStartMatch}
/>
```

### Important Notes
- All state and handlers come from useMatchSetup and useRosterImporter hooks
- Do not add local state inside this component
- Steps 1-5 are controlled by setupStep prop

---

## LiveScoringPanel

### What it does
Renders the live ball-by-ball scoring control matrix including the full scoring button grid, over timeline, analytics widgets, and bottom utility bar.

### Purpose in application
Shown when match.matchPhase is not "SETUP". This is the main working screen for the scorer during a live match.

### Who can use this
Any developer building a ball-by-ball scoring interface or a mini scorer widget.

### How to use
```jsx
import LiveScoringPanel from "../components/LiveScoringPanel.jsx"

<LiveScoringPanel
  match={match}
  activeInnings={activeInnings}
  dispatch={dispatch}
  setActiveModal={setActiveModal}
  handleScoreBall={handleScoreBall}
  handlePubLive={handlePubLive}
  handleBowlerSelect={handleBowlerSelect}
  onViewScoreboard={onViewScoreboard}
  setOutBatterId={setOutBatterId}
  setNewBatterId={setNewBatterId}
  setWicketType={setWicketType}
  setFielderId={setFielderId}
  setKeeperId={setKeeperId}
  initWicketFlow={initWicketFlow}
  setSetupStep={setSetupStep}
  tempRuns={tempRuns}
  setTempRuns={setTempRuns}
/>
```

### Scoring Button Reference
| Button | Action Triggered |
|---|---|
| 0, 1, 2, 3, 4, 6 | handleScoreBall("RUN", runs) |
| DOT | handleScoreBall("RUN", 0) |
| WICKET | initWicketFlow() |
| WD | handleScoreBall("WD", 0) |
| NB | handleScoreBall("NB", 0) |
| BYE | Opens BYE modal |
| LB | Opens LB modal |
| RUN OUT | Opens WICKET_FLOW modal with RUN_OUT type |
| STUMP | Opens WICKET_FLOW modal with STUMPED type |
| NB + RUNS | Opens NB_RUNS modal |
| WD + RUNS | Opens WD_RUNS modal |
| REVIEW | handleScoreBall("CUSTOM", 0, 0, undefined, "REV") |

---

## ScorerModals

### What it does
Single unified modal layer that renders all overlay dialogs used across the scorer console.

### Purpose in application
Centralizes all modal JSX in one place. Controlled by a single activeModal string.

### Who can use this
Any developer who needs to trigger scorer modals from a different page or component.

### How to use
```jsx
import ScorerModals from "../components/ScorerModals.jsx"

<ScorerModals
  match={match}
  activeInnings={activeInnings}
  activeModal={activeModal}
  setActiveModal={setActiveModal}
  dispatch={dispatch}
  tempRuns={tempRuns}
  setTempRuns={setTempRuns}
  wicketType={wicketType}
  setWicketType={setWicketType}
  outBatterId={outBatterId}
  setOutBatterId={setOutBatterId}
  fielderId={fielderId}
  setFielderId={setFielderId}
  keeperId={keeperId}
  setKeeperId={setKeeperId}
  newBatterId={newBatterId}
  setNewBatterId={setNewBatterId}
  confirmWicket={confirmWicket}
  handleBowlerSelect={handleBowlerSelect}
  handleScoreBall={handleScoreBall}
  selectedXI_A={selectedXI_A}
  selectedXI_B={selectedXI_B}
  currentRosterA={currentRosterA}
  currentRosterB={currentRosterB}
  searchQueryA={searchQueryA}
  setSearchQueryA={setSearchQueryA}
  searchQueryB={searchQueryB}
  setSearchQueryB={setSearchQueryB}
  setSelectedXI_A={setSelectedXI_A}
  setSelectedXI_B={setSelectedXI_B}
  setSetupStep={setSetupStep}
/>
```

### Modal Name Reference
| activeModal value | Modal Shown |
|---|---|
| "SQUAD_PICKER_A" | Team A playing XI selector |
| "SQUAD_PICKER_B" | Team B playing XI selector |
| "MANUAL_EVENTS" | Match events panel (powerplay, timeout, etc.) |
| "CHANGE_BOWLER" | Bowler selector for next over |
| "WICKET_FLOW" | Full wicket dismissal wizard |
| "BYE" | Bye runs specifier |
| "LB" | Leg bye runs specifier |
| "WD_RUNS" | Wide + runs specifier |
| "NB_RUNS" | No ball + runs specifier |
| "NONE" | No modal shown |
