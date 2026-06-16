import { useCallback, useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { undoScore, syncScores, changeBowler, dismissBanner, updateBallEvent } from "../../scoreboard/store/mathSlice.js";
import { useSocket } from "../../../shared/services/socket/useSocket.js";
import { useMatchesQuery } from "../../../shared/hooks/useQueries.js";
import { Undo, Save, Settings, X, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useWicketFlow } from "../hooks/useWicketFlow.js";
import { useMatchSetup } from "../hooks/useMatchSetup.js";
import { useRosterImporter } from "../hooks/useRosterImporter.js";
import { useSyncScores } from "../hooks/useSyncScores.js";
import { useCommentarySync } from "../hooks/useCommentarySync.js";
import SetupWizard from "../components/SetupWizard.jsx";
import LiveScoringPanel from "../components/LiveScoringPanel.jsx";
import ScorerModals from "../components/ScoreModal.jsx";

const EMPTY_ROSTER = [];
const getRosterPlayerKey = (player) => player?.id || player?.playerId || player?._id || player?.name || "";

export const ScorerConsolePage = ({ onViewScoreboard }) => {
  const dispatch = useDispatch(), match = useSelector(s => s.match.currentMatch);
  const matchesList = useSelector(s => s.match.matchesList || []), activeInnings = match.innings[match.currentInningsNum - 1];
  const isSynced = useSelector(s => s.match.isSynced), { emitScoreUpdate } = useSocket();
  const [activeModal, setActiveModal] = useState("NONE"), [tempRuns, setTempRuns] = useState(1);
  const rosters = useSelector(s => s.match.rosters || {}), currentRosterA = rosters[match.teamA.id] || EMPTY_ROSTER, currentRosterB = rosters[match.teamB.id] || EMPTY_ROSTER;
  const defaultXI_A = useMemo(() => currentRosterA.slice(0, 11), [currentRosterA]);
  const defaultXI_B = useMemo(() => currentRosterB.slice(0, 11), [currentRosterB]);
  const rosterSelectionKey = useMemo(() => [
    match.id,
    match.teamA.id,
    match.teamB.id,
    currentRosterA.map(getRosterPlayerKey).join("|"),
    currentRosterB.map(getRosterPlayerKey).join("|"),
  ].join("::"), [match.id, match.teamA.id, match.teamB.id, currentRosterA, currentRosterB]);
  const [selectedXIState, setSelectedXIState] = useState(() => ({
    key: rosterSelectionKey,
    teamA: defaultXI_A,
    teamB: defaultXI_B,
  }));
  const isCurrentXI = selectedXIState.key === rosterSelectionKey;
  const selectedXI_A = isCurrentXI ? selectedXIState.teamA : defaultXI_A;
  const selectedXI_B = isCurrentXI ? selectedXIState.teamB : defaultXI_B;
  const setSelectedXI_A = useCallback((nextValue) => {
    setSelectedXIState((current) => {
      const useCurrent = current.key === rosterSelectionKey;
      const baseTeamA = useCurrent ? current.teamA : defaultXI_A;
      const baseTeamB = useCurrent ? current.teamB : defaultXI_B;

      return {
        key: rosterSelectionKey,
        teamA: typeof nextValue === "function" ? nextValue(baseTeamA) : nextValue,
        teamB: baseTeamB,
      };
    });
  }, [defaultXI_A, defaultXI_B, rosterSelectionKey]);
  const setSelectedXI_B = useCallback((nextValue) => {
    setSelectedXIState((current) => {
      const useCurrent = current.key === rosterSelectionKey;
      const baseTeamA = useCurrent ? current.teamA : defaultXI_A;
      const baseTeamB = useCurrent ? current.teamB : defaultXI_B;

      return {
        key: rosterSelectionKey,
        teamA: baseTeamA,
        teamB: typeof nextValue === "function" ? nextValue(baseTeamB) : nextValue,
      };
    });
  }, [defaultXI_A, defaultXI_B, rosterSelectionKey]);

  const { wicketType, setWicketType, outBatterId, setOutBatterId, fielderId, setFielderId, keeperId, setKeeperId, newBatterId, setNewBatterId, initWicketFlow, confirmWicket } = useWicketFlow({ match, activeInnings, dispatch, setActiveModal });
  const { setupStep, setSetupStep, tossWinner, setTossWinner, tossDecision, setTossDecision, newMatchTitle, setNewMatchTitle, newMatchSubtitle, setNewMatchSubtitle, newTeamAName, setNewTeamAName, newTeamBName, setNewTeamBName, wizardStrikerId, setWizardStrikerId, wizardNonStrikerId, setWizardNonStrikerId, wizardBowlerId, setWizardBowlerId, handleCreateDynamicMatch, initWizardOpeningRoles, handleStartMatch } = useMatchSetup({ match, selectedXI_A, selectedXI_B, dispatch });
  const { newPlayerName, setNewPlayerName, newPlayerRole, setNewPlayerRole, handleAddManualPlayer, handleXLSXImportSimulation } = useRosterImporter({ match, dispatch });
  const [searchQueryA, setSearchQueryA] = useState(""), [searchQueryB, setSearchQueryB] = useState("");

  // Fetch backend matches for the SetupWizard to display
  const { data: backendMatches = [], isLoading: backendMatchesLoading } = useMatchesQuery();

  const { handleSync: handlePubLiveSync, isSaving, error: syncError, success: syncSuccess, clearError } = useSyncScores();
  useCommentarySync();

  const handleScoreBall = (type, runs, extraRuns, wicketType, customLabel) => {
    dispatch(updateBallEvent({ type, runs, extraRuns, wicketType, customLabel }));
    emitScoreUpdate(match.id, { ballType: type, runs, extraRuns, wicketType });
  };
  const handlePubLive = async () => {
    clearError();
    try {
      await handlePubLiveSync();
    } catch {
      // Error is handled in the hook and displayed in the UI
    }
  };
  const handleBowlerSelect = (bId) => {
    if (bId === match.activeBowlerId) { alert("This bowler is already bowling!"); return; }
    dispatch(changeBowler({ bowlerId: bId })); setActiveModal("NONE");
  };

  return (
    <div className="flex flex-col min-h-screen text-white bg-zinc-950 font-sans selection:bg-emerald-500/20">
      <AnimatePresence>
        {match.showDismissalBanner && match.lastDismissalEvent && (
          <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -100, opacity: 0 }} className="fixed top-20 left-1/2 -translate-x-1/2 z-55 w-full max-w-lg px-4">
            <div className="bg-gradient-to-r from-red-950/95 via-zinc-900/95 to-red-950/95 border-2 border-red-500/30 p-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-center justify-between gap-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-extrabold shadow-lg shrink-0">OUT</div>
                <div>
                  <h4 className="text-sm font-black text-rose-400 tracking-wide">{match.lastDismissalEvent.batterName.toUpperCase()} DEPARTS!</h4>
                  <p className="text-[11px] text-zinc-400 font-medium">{match.lastDismissalEvent.detail} • <span className="font-mono font-bold text-white">{match.lastDismissalEvent.runs} runs</span> off {match.lastDismissalEvent.balls} balls.</p>
                </div>
              </div>
              <button onClick={() => dispatch(dismissBanner())} className="p-1.5 rounded-full hover:bg-white/10 text-zinc-450 hover:text-white transition-all cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black tracking-tight bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">BoundaryLine Console</span>
          <div className="h-5 w-[1px] bg-white/20"></div>
          <span className="text-xs font-semibold text-zinc-400">{match.title} - Console</span>
        </div>
        <div className="flex items-center gap-3.5">
          <span className="text-xs font-semibold flex items-center gap-1 bg-zinc-900 px-3 py-1.5 rounded-lg border border-white/5">
            <span className={`h-2 w-2 rounded-full ${isSynced ? "bg-emerald-500" : "bg-yellow-500 animate-pulse"}`}></span>{isSynced ? "Synced" : "Sync Required"}
          </span>
          <button onClick={() => dispatch(undoScore())} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 hover:border-white/20 text-xs font-bold text-zinc-300 hover:text-white transition-all active:scale-95 cursor-pointer"><Undo className="w-3.5 h-3.5" />Undo</button>
          <button
            onClick={handlePubLive}
            disabled={isSaving}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${
              syncSuccess
                ? 'bg-emerald-500 text-black shadow-emerald-500/30'
                : syncError
                  ? 'bg-red-600 text-white shadow-red-600/20 hover:bg-red-500'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-black shadow-emerald-600/10'
            }`}
          >
            {isSaving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : syncSuccess ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {isSaving ? 'Saving...' : syncSuccess ? 'Saved!' : 'Save'}
          </button>
          <button type="button" onClick={() => setActiveModal("MANUAL_EVENTS")} className="p-2 rounded-xl bg-zinc-900 border border-white/5 hover:border-white/10 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"><Settings className="w-4.5 h-4.5" /></button>
        </div>
      </div>

      {match.matchPhase === "SETUP" ? (
        <SetupWizard
          match={match} matchesList={matchesList} dispatch={dispatch} currentRosterA={currentRosterA} currentRosterB={currentRosterB}
          selectedXI_A={selectedXI_A} selectedXI_B={selectedXI_B} setSelectedXI_A={setSelectedXI_A} setSelectedXI_B={setSelectedXI_B}
          setActiveModal={setActiveModal} setupStep={setupStep} setSetupStep={setSetupStep} tossWinner={tossWinner} setTossWinner={setTossWinner}
          tossDecision={tossDecision} setTossDecision={setTossDecision} newMatchTitle={newMatchTitle} setNewMatchTitle={setNewMatchTitle}
          newMatchSubtitle={newMatchSubtitle} setNewMatchSubtitle={setNewMatchSubtitle} newTeamAName={newTeamAName} setNewTeamAName={setNewTeamAName}
          newTeamBName={newTeamBName} setNewTeamBName={setNewTeamBName} newPlayerName={newPlayerName} setNewPlayerName={setNewPlayerName}
          newPlayerRole={newPlayerRole} setNewPlayerRole={setNewPlayerRole} wizardStrikerId={wizardStrikerId} setWizardStrikerId={setWizardStrikerId}
          wizardNonStrikerId={wizardNonStrikerId} setWizardNonStrikerId={setWizardNonStrikerId} wizardBowlerId={wizardBowlerId} setWizardBowlerId={setWizardBowlerId}
          handleCreateDynamicMatch={handleCreateDynamicMatch} handleAddManualPlayer={handleAddManualPlayer} handleXLSXImportSimulation={handleXLSXImportSimulation}
          initWizardOpeningRoles={initWizardOpeningRoles} handleStartMatch={handleStartMatch}
          backendMatches={backendMatches} backendMatchesLoading={backendMatchesLoading}
        />
      ) : (
        <LiveScoringPanel
          match={match} activeInnings={activeInnings} dispatch={dispatch} setActiveModal={setActiveModal} handleScoreBall={handleScoreBall}
          handlePubLive={handlePubLive} handleBowlerSelect={handleBowlerSelect} onViewScoreboard={onViewScoreboard} setOutBatterId={setOutBatterId}
          setNewBatterId={setNewBatterId} setWicketType={setWicketType} setFielderId={setFielderId} setKeeperId={setKeeperId}
          initWicketFlow={initWicketFlow} setSetupStep={setSetupStep} tempRuns={tempRuns} setTempRuns={setTempRuns}
        />
      )}

      <ScorerModals
        match={match} activeInnings={activeInnings} activeModal={activeModal} setActiveModal={setActiveModal} dispatch={dispatch}
        tempRuns={tempRuns} setTempRuns={setTempRuns} wicketType={wicketType} setWicketType={setWicketType} outBatterId={outBatterId}
        setOutBatterId={setOutBatterId} fielderId={fielderId} setFielderId={setFielderId} keeperId={keeperId} setKeeperId={setKeeperId}
        newBatterId={newBatterId} setNewBatterId={setNewBatterId} confirmWicket={confirmWicket} handleBowlerSelect={handleBowlerSelect}
        handleScoreBall={handleScoreBall} selectedXI_A={selectedXI_A} selectedXI_B={selectedXI_B} currentRosterA={currentRosterA}
        currentRosterB={currentRosterB} searchQueryA={searchQueryA} setSearchQueryA={setSearchQueryA} searchQueryB={searchQueryB}
        setSearchQueryB={setSearchQueryB} setSelectedXI_A={setSelectedXI_A} setSelectedXI_B={setSelectedXI_B} setSetupStep={setSetupStep}
      />
    </div>
  );
};

export default ScorerConsolePage;
