import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScorerMatchStatus from "../components/ScorerMatchStatus.jsx";
import ScorerProjectedScore from "../components/ScorerProjectedScore.jsx";
import BatterTrendChart from "../components/BatterTrendChart.jsx";
import {
  setActiveMatch,
  createDynamicMatch,
  addPlayerToRoster,
  updateBallEvent,
  undoScore,
  syncScores,
  startMatchSetup,
  swapStrike,
  changeBowler,
  triggerMatchFlowEvent,
  dismissBanner,
} from "../../scoreboard/store/mathSlice.js";
import useSocket from "../../shared/services/socket/useSocket";
import {
  Undo,
  Save,
  Settings,
  ArrowRight,
  ShieldAlert,
  FolderSync,
  X,
  Play,
  RotateCcw,
  User,
  Check,
  Search,
  Users,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import PremiumSelect from "../components/PremiumSelect.jsx";
import { useWicketFlow } from "../hooks/useWicketFlow.js";

export const ScorerConsolePage = ({ onViewScoreboard }) => {
  const dispatch = useDispatch();
  const match = useSelector((state) => state.match.currentMatch);
  const matchesList = useSelector((state) => state.match.matchesList || []);
  const activeInnings =
    match?.innings?.[(match?.currentInningsNum || 1) - 1] || null;
  const isSynced = useSelector((state) => state.match.isSynced);
  console.log("useSocket =", useSocket);
  const { emitScoreUpdate } = useSocket();

  // Active modal controls
  const [activeModal, setActiveModal] = useState("NONE");
  const [tempRuns, setTempRuns] = useState(1);

  // Wicket flow working state using custom hook
  const {
    wicketType,
    setWicketType,
    outBatterId,
    setOutBatterId,
    fielderId,
    setFielderId,
    keeperId,
    setKeeperId,
    wicketBowlerId,
    setWicketBowlerId,
    newBatterId,
    setNewBatterId,
    handleWicketButtonClick,
    handleWicketConfirm,
  } = useWicketFlow(match, activeInnings, dispatch, setActiveModal);

  // Setup wizard working state
  const [setupStep, setSetupStep] = useState(1);
  const [tossWinner, setTossWinner] = useState("");
  const [tossDecision, setTossDecision] = useState("BAT");

  // Custom Dynamic Match Entry Form
  const [newMatchTitle, setNewMatchTitle] = useState("");
  const [newMatchSubtitle, setNewMatchSubtitle] = useState("LIVE • T20 Finals");
  const [newTeamAName, setNewTeamAName] = useState("");
  const [newTeamBName, setNewTeamBName] = useState("");

  // Custom Player Entry Form
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerRole, setNewPlayerRole] = useState("BATTER");

  // Dynamic selector for rosters from store state
  const rosters = useSelector((state) => state.match.rosters || {});
  const currentRosterA = rosters?.[match?.teamA?.id] || [];
  const currentRosterB = rosters?.[match?.teamB?.id] || [];
  const teamAId = match?.teamA?.id;
  const teamBId = match?.teamB?.id;
  const [selectedXI_A, setSelectedXI_A] = useState([]);
  const [selectedXI_B, setSelectedXI_B] = useState(() =>
    currentRosterB.slice(0, 11),
  );

  // Reactively initialize selected XI from rosters
  useEffect(() => {
    if (!teamAId) return;
    setSelectedXI_A(currentRosterA.slice(0, 11));
  }, [currentRosterA.length, teamAId]);

  useEffect(() => {
    if (!teamBId) return;
    setSelectedXI_B(currentRosterB.slice(0, 11));
  }, [currentRosterB.length, teamBId]);

  const [wizardStrikerId, setWizardStrikerId] = useState("");
  const [wizardNonStrikerId, setWizardNonStrikerId] = useState("");
  const [wizardBowlerId, setWizardBowlerId] = useState("");

  // Search filter states
  const [searchQueryA, setSearchQueryA] = useState("");
  const [searchQueryB, setSearchQueryB] = useState("");

  // Trigger standard ball score helper
  const handleScoreBall = (type, runs, extraRuns, wicketType, customLabel) => {
    dispatch(
      updateBallEvent({
        type,
        runs,
        extraRuns,
        wicketType,
        customLabel,
      }),
    );

    emitScoreUpdate(match.id, {
      ballType: type,
      runs,
      extraRuns,
      wicketType,
    });
  };

  const handlePubLive = () => {
    dispatch(syncScores());
    alert("⚡ Match Synchronized Live to BoundaryLine API!");
  };

  // Launch fresh setup or prepopulate striker selections
  const initWizardOpeningRoles = () => {
    if (selectedXI_A.length > 0) {
      setWizardStrikerId(selectedXI_A[0]?.id || "");
      setWizardNonStrikerId(selectedXI_A[1]?.id || "");
    }
    if (selectedXI_B.length > 0) {
      const bowler =
        selectedXI_B.find(
          (p) => p.role === "BOWLER" || p.role === "ALL_ROUNDER",
        ) || selectedXI_B[selectedXI_B.length - 1];
      setWizardBowlerId(bowler?.id || "");
    }
  };

  const handleAddManualPlayer = (teamChar) => {
    if (!newPlayerName.trim()) {
      alert("Please enter a player name!");
      return;
    }
    const teamId = teamChar === "A" ? match.teamA.id : match.teamB.id;
    const playerItem = {
      id: `p-custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: newPlayerName.trim(),
      role: newPlayerRole,
    };
    dispatch(addPlayerToRoster({ teamId, player: playerItem }));
    setNewPlayerName("");
  };

  const handleCreateDynamicMatchSubmit = (e) => {
    e.preventDefault();
    if (!newMatchTitle.trim() || !newTeamAName.trim() || !newTeamBName.trim()) {
      alert("Please complete Match Title, Team A Title, and Team B Title!");
      return;
    }
    const generatedId = `match-dynamic-${Date.now()}`;
    dispatch(
      createDynamicMatch({
        id: generatedId,
        title: newMatchTitle.trim(),
        subtitle: newMatchSubtitle.trim() || "LIVE • T20 Match",
        teamAName: newTeamAName.trim(),
        teamBName: newTeamBName.trim(),
      }),
    );
    setNewMatchTitle("");
    setNewTeamAName("");
    setNewTeamBName("");
    alert("⚡ Dynamic Live Match created! Roster builder is now unlocked.");
    setSetupStep(2);
  };

  const handleStartMatchSubmit = () => {
    if (!tossWinner) {
      alert("Please select Toss Winner first!");
      return;
    }
    if (selectedXI_A.length < 5 || selectedXI_B.length < 5) {
      alert(
        "Please ensure both playing squads have at least 5 players confirmed!",
      );
      return;
    }
    if (!wizardStrikerId || !wizardNonStrikerId || !wizardBowlerId) {
      alert("Please select opening Striker, Non-Striker and Bowler!");
      return;
    }
    if (wizardStrikerId === wizardNonStrikerId) {
      alert("Striker and Non-Striker cannot be the same player!");
      return;
    }

    dispatch(
      startMatchSetup({
        tossWinner,
        tossDecision,
        teamA_XI: selectedXI_A,
        teamB_XI: selectedXI_B,
        strikerId: wizardStrikerId,
        nonStrikerId: wizardNonStrikerId,
        bowlerId: wizardBowlerId,
      }),
    );
  };

  // Change Bowler trigger
  const handleBowlerSelect = (bId) => {
    if (bId === match.activeBowlerId) {
      alert("This bowler is already bowling!");
      return;
    }
    dispatch(changeBowler({ bowlerId: bId }));
    setActiveModal("NONE");
  };

  return (
    <div className="flex flex-col min-h-screen text-white bg-zinc-950 font-sans selection:bg-emerald-500/20">
      {/* FALL OF WICKET BROADCAST-STYLE FLOATING NOTIFICATION BANNER */}
      <AnimatePresence>
        {match.showDismissalBanner && match.lastDismissalEvent && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-55 w-full max-w-lg px-4"
          >
            <div className="bg-gradient-to-r from-red-950/95 via-zinc-900/95 to-red-950/95 border-2 border-red-500/30 p-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-extrabold shadow-lg shadow-red-600/20 animate-pulse shrink-0">
                  OUT
                </div>
                <div>
                  <h4 className="text-sm font-black text-rose-400 tracking-wide">
                    {match.lastDismissalEvent.batterName.toUpperCase()} DEPARTS!
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-medium">
                    {match.lastDismissalEvent.detail} •{" "}
                    <span className="font-mono font-bold text-white">
                      {match.lastDismissalEvent.runs} runs
                    </span>{" "}
                    off {match.lastDismissalEvent.balls} balls.
                  </p>
                </div>
              </div>
              <button
                onClick={() => dispatch(dismissBanner())}
                className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BAR */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black tracking-tight bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
            BoundaryLine Console
          </span>
          <div className="h-5 w-[1px] bg-white/20"></div>
          <span className="text-xs font-semibold text-zinc-400">
            {match.title} - Console
          </span>
        </div>

        {/* Action controllers */}
        <div className="flex items-center gap-3.5">
          <span className="text-xs font-semibold flex items-center gap-1 bg-zinc-900 px-3 py-1.5 rounded-lg border border-white/5">
            <span
              className={`h-2 w-2 rounded-full ${
                isSynced ? "bg-emerald-500" : "bg-yellow-500 animate-pulse"
              }`}
            ></span>
            {isSynced ? "Synced" : "Sync Required"}
          </span>

          <button
            onClick={() => dispatch(undoScore())}
            title="Undo Scoring Ball"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 hover:border-white/20 text-xs font-bold text-zinc-300 hover:text-white transition-all active:scale-95 cursor-pointer"
          >
            <Undo className="w-3.5 h-3.5" />
            Undo
          </button>

          <button
            onClick={handlePubLive}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-md shadow-emerald-600/10"
          >
            <Save className="w-3.5 h-3.5" />
            Save
          </button>

          <button
            type="button"
            onClick={() => setActiveModal("MANUAL_EVENTS")}
            className="p-2 rounded-xl bg-zinc-900 border border-white/5 hover:border-white/10 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
            title="Toss & Match breaks controls"
          >
            <Settings className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* SETUP WIZARD SCREEN */}
      {match.matchPhase === "SETUP" ? (
        <div className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6 flex flex-col gap-5">
          <div className="p-6 md:p-8 rounded-2xl bg-zinc-900/95 border border-zinc-800/80 flex flex-col gap-5 relative shadow-[0_32px_64px_-16px_rgba(0,0,0,0.85)] overflow-visible">
            <div className="flex justify-between items-start pb-4 border-b border-zinc-800">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  Official Match Control Center
                </h2>
                <p className="text-[11px] text-zinc-400">
                  Configure team rosters, toss coordinates, and initiate live
                  game feeds.
                </p>
              </div>
              <span className="text-[9px] font-mono font-bold bg-zinc-950 text-emerald-400 border border-emerald-500/25 px-2.5 py-1 rounded-md uppercase tracking-wider shrink-0">
                Stage {setupStep} of 5
              </span>
            </div>

            {/* STEP 1: DYNAMIC MATCH CREATOR AND SELECTOR */}
            {setupStep === 1 && (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Exist Match Select Column */}
                  <div className="flex flex-col gap-4 p-5 bg-zinc-950/40 rounded-xl border border-zinc-850">
                    <div className="flex items-center gap-2">
                      <FolderSync className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-black text-white tracking-wide uppercase">
                        Select Preloaded Match
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-normal">
                      Pick any existing active fixture from the database to
                      initialize setup metrics.
                    </p>

                    <div className="flex flex-col gap-2 mt-2">
                      <label className="text-[10px] text-zinc-550 uppercase font-black tracking-wider block">
                        Active Fixture List
                      </label>
                      <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1">
                        {matchesList.map((m) => {
                          const isSelected = m.id === match.id;
                          return (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => {
                                dispatch(setActiveMatch(m.id));
                              }}
                              className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                                isSelected
                                  ? "bg-emerald-950/30 border-emerald-500/40 text-white"
                                  : "bg-zinc-900/60 border-white/5 text-zinc-400 hover:border-zinc-800 hover:text-white"
                              }`}
                            >
                              <div>
                                <span className="font-extrabold block text-xs leading-none">
                                  {m.teamA.name}{" "}
                                  <span className="text-emerald-400/80">
                                    vs
                                  </span>{" "}
                                  {m.teamB.name}
                                </span>
                                <span className="text-[9px] text-zinc-500 font-mono italic mt-1 block">
                                  {m.title} &bull; {m.subtitle || "LIVE"}
                                </span>
                              </div>
                              {isSelected && (
                                <span className="px-2 py-0.5 rounded text-[8px] font-mono font-bold tracking-widest bg-emerald-500/10 text-emerald-400 uppercase">
                                  Current
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Custom Creation Column */}
                  <form
                    onSubmit={handleCreateDynamicMatchSubmit}
                    className="flex flex-col gap-4 p-5 bg-zinc-950/40 rounded-xl border border-zinc-850"
                  >
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4 text-emerald-400 animate-pulse" />
                      <span className="text-xs font-black text-white tracking-wide uppercase">
                        Create Custom Match
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 leading-normal">
                      Remove preconfigured systems. Configure new visual titles
                      and dynamic team labels.
                    </p>

                    <div className="flex flex-col gap-3 mt-1">
                      <div>
                        <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block mb-1">
                          Match Title / Tournament
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., RCB VS KKR - Eliminator"
                          value={newMatchTitle}
                          onChange={(e) => setNewMatchTitle(e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-900 border border-white/5 rounded-lg text-xs font-sans focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block mb-1">
                            Team A Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Royal Challengers"
                            value={newTeamAName}
                            onChange={(e) => setNewTeamAName(e.target.value)}
                            className="w-full px-3 py-2 bg-zinc-900 border border-white/5 rounded-lg text-xs font-sans focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block mb-1">
                            Team B Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Kolkata Knight Riders"
                            value={newTeamBName}
                            onChange={(e) => setNewTeamBName(e.target.value)}
                            className="w-full px-3 py-2 bg-zinc-900 border border-white/5 rounded-lg text-xs font-sans focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 mt-2 bg-zinc-100 hover:bg-white text-black font-extrabold text-[11px] uppercase tracking-wider rounded-xl transition-all"
                      >
                        Create Dyn Match & Next
                      </button>
                    </div>
                  </form>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                  <span className="text-[10px] text-zinc-500 font-medium">
                    Selected current target:{" "}
                    <span className="font-bold text-white uppercase">
                      {match.teamA.name} vs {match.teamB.name}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setSetupStep(2)}
                    className="py-3 px-6 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold uppercase rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/10"
                  >
                    Proceed to Roster Builder
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: ROSTER MANAGEMENT & BUILDERS */}
            {setupStep === 2 && (
              <div className="flex flex-col gap-6">
                {/* Roster lists per team side-by-side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* Team A Roster Column */}
                  <div className="flex flex-col gap-3 p-4 bg-zinc-950/50 rounded-xl border border-zinc-850">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-emerald-400 tracking-wide uppercase">
                        {match.teamA.name} Pool ({currentRosterA.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => handleXLSXUploadSimulation("A")}
                        className="py-1 px-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-emerald-400 font-semibold text-[9px] uppercase rounded"
                        title="Prepare / parse mock xlsx roster data"
                      >
                        XLSX Bulk Import
                      </button>
                    </div>
                    <div className="max-h-40 overflow-y-auto flex flex-col gap-1.5 scrollbar-thin">
                      {currentRosterA.length === 0 ? (
                        <div className="py-6 text-center text-zinc-650 text-xs italic">
                          Roster is empty. Enter players manually or use XLSX
                          simulator.
                        </div>
                      ) : (
                        currentRosterA.map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800/40 text-xs"
                          >
                            <span className="font-medium text-zinc-300">
                              {p.name}
                            </span>
                            <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-950 text-emerald-400 uppercase tracking-widest leading-none">
                              {p.role}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Team B Roster Column */}
                  <div className="flex flex-col gap-3 p-4 bg-zinc-950/50 rounded-xl border border-zinc-850">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-emerald-400 tracking-wide uppercase">
                        {match.teamB.name} Pool ({currentRosterB.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => handleXLSXUploadSimulation("B")}
                        className="py-1 px-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-emerald-400 font-semibold text-[9px] uppercase rounded"
                        title="Prepare / parse mock xlsx roster data"
                      >
                        XLSX Bulk Import
                      </button>
                    </div>
                    <div className="max-h-40 overflow-y-auto flex flex-col gap-1.5 scrollbar-thin">
                      {currentRosterB.length === 0 ? (
                        <div className="py-6 text-center text-zinc-650 text-xs italic">
                          Roster is empty. Enter players manually or use XLSX
                          simulator.
                        </div>
                      ) : (
                        currentRosterB.map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800/40 text-xs"
                          >
                            <span className="font-medium text-zinc-300">
                              {p.name}
                            </span>
                            <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-950 text-emerald-400 uppercase tracking-widest leading-none">
                              {p.role}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Adding manual form controls */}
                <div className="p-4 bg-zinc-950/40 rounded-xl border border-zinc-850 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-black text-white tracking-wide uppercase">
                      Register Single Profile
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="md:col-span-2">
                      <label className="text-[10px] text-zinc-500 uppercase font-black tracking-wider block mb-1">
                        Full Player Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Jasprit Bumrah"
                        value={newPlayerName}
                        onChange={(e) => setNewPlayerName(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-900 border border-white/5 rounded-lg text-xs font-sans focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-zinc-500 uppercase font-black tracking-wider block mb-1">
                        Assigned Role
                      </label>
                      <select
                        value={newPlayerRole}
                        onChange={(e) => setNewPlayerRole(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-900 border border-white/5 rounded-lg text-xs font-sans text-grey-450 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="BATTER">BATTER</option>
                        <option value="BOWLER">BOWLER</option>
                        <option value="ALL_ROUNDER">ALL_ROUNDER</option>
                        <option value="WICKET_KEEPER">WICKET_KEEPER</option>
                      </select>
                    </div>

                    <div className="flex items-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddManualPlayer("A")}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-black font-extrabold text-[10px] uppercase rounded-lg transition-all"
                      >
                        + {match.teamA.shortName}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddManualPlayer("B")}
                        className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-500 text-black font-extrabold text-[10px] uppercase rounded-lg transition-all"
                      >
                        + {match.teamB.shortName}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Preparative architecture XLSX upload zone */}
                <div
                  onClick={() => handleXLSXUploadSimulation("A")}
                  className="p-5 bg-zinc-950/20 rounded-xl border border-dashed border-zinc-800 hover:border-emerald-500/50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <FolderSync className="w-6 h-6 text-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-zinc-300">
                    Bulk XLSX Upload Simulation (Click to Trigger)
                  </span>
                  <p className="text-[10px] text-zinc-550 text-center leading-normal max-w-sm">
                    Upload sheet columns containing [Player Name, Role, Team] to
                    mass import rosters. Click here to instantly parsing bulk
                    demo.
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-zinc-850">
                  <button
                    type="button"
                    onClick={() => setSetupStep(1)}
                    className="py-3 px-5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800/80 text-zinc-300 hover:text-white rounded-xl text-xs font-bold mr-auto uppercase cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        currentRosterA.length < 5 ||
                        currentRosterB.length < 5
                      ) {
                        alert(
                          "Please register at least 5 players to both roster pools before launching play!",
                        );
                        return;
                      }
                      setSetupStep(3);
                    }}
                    className="py-3 px-6 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold uppercase rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/10"
                  >
                    Proceed to Toss details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: MATCH TOSS CONFIGS */}
            {setupStep === 3 && (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800/60 flex flex-col gap-3">
                    <span className="text-xs font-bold text-zinc-350 tracking-wide uppercase">
                      Toss Coordinates
                    </span>
                    <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                      Select Toss Winner
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setTossWinner(match.teamA.name)}
                        className={`py-2.5 px-3 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                          tossWinner === match.teamA.name
                            ? "bg-zinc-100 text-black shadow-md"
                            : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800/60 hover:bg-zinc-800/40"
                        }`}
                      >
                        {match.teamA.name}
                      </button>
                      <button
                        onClick={() => setTossWinner(match.teamB.name)}
                        className={`py-2.5 px-3 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                          tossWinner === match.teamB.name
                            ? "bg-zinc-100 text-black shadow-md"
                            : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800/60 hover:bg-zinc-800/40"
                        }`}
                      >
                        {match.teamB.name}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800/60 flex flex-col gap-3">
                    <span className="text-xs font-bold text-zinc-350 tracking-wide uppercase">
                      Decision Metric
                    </span>
                    <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                      Select Choice
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setTossDecision("BAT")}
                        className={`py-2.5 px-3 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                          tossDecision === "BAT"
                            ? "bg-zinc-100 text-black shadow-md"
                            : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800/60 hover:bg-zinc-800/40"
                        }`}
                      >
                        BATTING FIRST
                      </button>
                      <button
                        onClick={() => setTossDecision("FIELD")}
                        className={`py-2.5 px-3 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                          tossDecision === "FIELD"
                            ? "bg-zinc-100 text-black shadow-md"
                            : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800/60 hover:bg-zinc-800/40"
                        }`}
                      >
                        FIELDING FIRST
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/60 text-xs text-zinc-400 leading-relaxed font-sans">
                  <span className="font-bold text-emerald-400 block mb-0.5">
                    Rosters Confirmed
                  </span>
                  Lineups for both teams are unlocked. You may personalize squad
                  selections on the next partition.
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSetupStep(2)}
                    className="py-3 px-5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800/80 text-zinc-300 hover:text-white rounded-xl text-xs font-bold mr-auto uppercase cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!tossWinner) {
                        alert("Please choose toss winner!");
                        return;
                      }
                      setSetupStep(4);
                    }}
                    className="py-3 px-6 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold uppercase rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/10"
                  >
                    Confirm Toss & Proceed
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: PLAYING XI CONFIRMATIONS */}
            {setupStep === 4 && (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Team A Picker */}
                  <div className="flex flex-col gap-3 p-4 bg-zinc-950/60 rounded-xl border border-zinc-800/60">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase">
                        {match.teamA.name} Squad ({selectedXI_A.length}/11)
                      </span>
                      <button
                        onClick={() => setActiveModal("SQUAD_PICKER_A")}
                        className="py-1 px-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-emerald-400 font-semibold text-[10px] uppercase rounded hover:bg-zinc-850 cursor-pointer"
                      >
                        Modify XI
                      </button>
                    </div>
                    <div className="max-h-56 overflow-y-auto pr-1 flex flex-col gap-1.5 scrollbar-thin">
                      {selectedXI_A.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800/40 text-xs"
                        >
                          <span className="font-medium text-zinc-300">
                            {p.name}
                          </span>
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-950 text-emerald-400 border border-zinc-800/80">
                            {p.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team B Picker */}
                  <div className="flex flex-col gap-3 p-4 bg-zinc-950/60 rounded-xl border border-zinc-800/60">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase">
                        {match.teamB.name} Squad ({selectedXI_B.length}/11)
                      </span>
                      <button
                        onClick={() => setActiveModal("SQUAD_PICKER_B")}
                        className="py-1 px-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-emerald-400 font-semibold text-[10px] uppercase rounded hover:bg-zinc-850 cursor-pointer"
                      >
                        Modify XI
                      </button>
                    </div>
                    <div className="max-h-56 overflow-y-auto pr-1 flex flex-col gap-1.5 scrollbar-thin">
                      {selectedXI_B.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800/40 text-xs"
                        >
                          <span className="font-medium text-zinc-300">
                            {p.name}
                          </span>
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-950 text-emerald-400 border border-zinc-800/80">
                            {p.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSetupStep(3)}
                    className="py-3 px-5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800/80 text-zinc-300 hover:text-white rounded-xl text-xs font-bold mr-auto uppercase cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      initWizardOpeningRoles();
                      setSetupStep(5);
                    }}
                    className="py-3 px-6 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold uppercase rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/10"
                  >
                    Confirm Squads & Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: ASSIGN MATCH OPENING DETAILS */}
            {setupStep === 5 && (
              <div className="flex flex-col gap-6 font-sans text-xs">
                {/* Visual dropdown/selectors for openers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Striker */}
                  <div className="p-4 bg-zinc-950/40 rounded-xl border border-zinc-800/60 flex flex-col gap-1 shadow-sm">
                    <PremiumSelect
                      label="Opening Striker"
                      placeholder="Choose Striker"
                      options={selectedXI_A}
                      value={wizardStrikerId}
                      onChange={setWizardStrikerId}
                      disabledIds={[wizardNonStrikerId]}
                      teamColorTheme="emerald"
                    />
                  </div>

                  {/* Non-Striker */}
                  <div className="p-4 bg-zinc-950/40 rounded-xl border border-zinc-800/60 flex flex-col gap-1 shadow-sm">
                    <PremiumSelect
                      label="Non-Striker Batter"
                      placeholder="Choose Non-Striker"
                      options={selectedXI_A}
                      value={wizardNonStrikerId}
                      onChange={setWizardNonStrikerId}
                      disabledIds={[wizardStrikerId]}
                      teamColorTheme="emerald"
                    />
                  </div>

                  {/* Bowler */}
                  <div className="p-4 bg-zinc-950/40 rounded-xl border border-zinc-800/60 flex flex-col gap-1 shadow-sm">
                    <PremiumSelect
                      label="Opening Bowler"
                      placeholder="Choose Bowler"
                      options={selectedXI_B}
                      value={wizardBowlerId}
                      onChange={setWizardBowlerId}
                      teamColorTheme="cyan"
                    />
                  </div>
                </div>

                {/* Confirm final configuration */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSetupStep(4)}
                    className="py-3 px-5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800/80 text-zinc-300 hover:text-white rounded-xl text-xs font-bold mr-auto uppercase cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleStartMatchSubmit}
                    className="py-3.5 px-8 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold uppercase rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/10 cursor-pointer active:scale-[0.98]"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Launch Match Feeding
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* LIVE GAME CONTROL MATRIX PANEL */
        <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
          <ScorerMatchStatus />

          {/* Over completed bowling prompt */}
          {match.matchEvent === "END_OVER" && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/90 to-blue-950/80 border border-cyan-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl shadow-cyan-950/20"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center animate-ping">
                  🏏
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">
                    Over Completed successfully!
                  </h4>
                  <p className="text-xs text-zinc-450 mt-0.5">
                    Please appoint a new bowler to bowl the subsequent over.
                    Consecutive overs from one bowler are blocked.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal("CHANGE_BOWLER")}
                className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs uppercase rounded-xl transition-all shadow-md shadow-cyan-500/15"
              >
                Assemble Next Bowler
              </button>
            </motion.div>
          )}

          {/* Timeline Row */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-between gap-4">
            <OverTimeline
              balls={match.thisOver}
              label={`OVER ${activeInnings.overs}`}
            />
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1 font-mono">
              OVER PROGRESS
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* GRID LAYOUT FOR ACTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* THE CONTROL PAD PANEL (Span 2) */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-zinc-900 border border-white/5 flex flex-col gap-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold tracking-widest text-zinc-400 font-sans uppercase">
                    SCORING CONTROLS
                  </h3>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => dispatch(swapStrike())}
                      className="px-2.5 py-1 text-[10px] font-bold bg-zinc-950 hover:bg-zinc-800 border border-white/5 hover:border-white/10 rounded-lg text-emerald-400 flex items-center gap-1 cursor-pointer"
                      title="Manual strike rotation swap"
                    >
                      🔄 SWAP STRIKE
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveModal("CHANGE_BOWLER")}
                      className="px-2.5 py-1 text-[10px] font-bold bg-zinc-950 hover:bg-zinc-800 border border-white/5 hover:border-white/10 rounded-lg text-cyan-400 flex items-center gap-1 cursor-pointer"
                      title="Appoint Bowler"
                    >
                      🥎 CHANGE BOWLER
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {/* ROW 1: 0, 1, 2, 3 */}
                  <button
                    type="button"
                    onClick={() => handleScoreBall("RUN", 0)}
                    className="h-16 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 hover:border-white/10 text-xl font-bold font-mono transition-all active:scale-95 cursor-pointer flex items-center justify-center text-zinc-300"
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScoreBall("RUN", 1)}
                    className="h-16 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 hover:border-white/10 text-xl font-bold font-mono transition-all active:scale-95 cursor-pointer flex items-center justify-center text-zinc-300"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScoreBall("RUN", 2)}
                    className="h-16 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 hover:border-white/10 text-xl font-bold font-mono transition-all active:scale-95 cursor-pointer flex items-center justify-center text-zinc-300"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScoreBall("RUN", 3)}
                    className="h-16 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 hover:border-white/10 text-xl font-bold font-mono transition-all active:scale-95 cursor-pointer flex items-center justify-center text-zinc-300"
                  >
                    3
                  </button>

                  {/* ROW 2: 4, 6, DOT, WICKET */}
                  <button
                    type="button"
                    onClick={() => handleScoreBall("RUN", 4)}
                    className="h-20 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/20 text-2xl font-black font-mono transition-all active:scale-95 cursor-pointer flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-950/50"
                  >
                    4
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScoreBall("RUN", 6)}
                    className="h-20 rounded-xl bg-lime-600 hover:bg-lime-500 text-black text-2xl font-black font-mono transition-all active:scale-95 cursor-pointer flex items-center justify-center shadow-lg shadow-lime-600/10"
                  >
                    6
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScoreBall("RUN", 0)}
                    className="h-20 rounded-xl bg-zinc-800 hover:bg-zinc-750 border border-white/5 text-sm font-semibold tracking-wider font-sans transition-all active:scale-95 cursor-pointer flex items-center justify-center text-zinc-450"
                  >
                    DOT
                  </button>
                  <button
                    type="button"
                    onClick={handleWicketButtonClick}
                    className="h-20 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-red-500/20 hover:border-red-500/30 text-base font-extrabold font-sans tracking-wide transition-all active:scale-95 cursor-pointer flex items-center justify-center text-red-400 shadow-lg shadow-rose-950/45"
                  >
                    WICKET
                  </button>

                  {/* ROW 3: WD, NB, BYE, LB */}
                  <button
                    type="button"
                    onClick={() => handleScoreBall("WD", 0)}
                    className="h-14 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 text-sm font-bold font-mono text-zinc-450 transition-all active:scale-95"
                  >
                    WD
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScoreBall("NB", 0)}
                    className="h-14 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 text-sm font-bold font-mono text-zinc-450 transition-all active:scale-95"
                  >
                    NB
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTempRuns(1);
                      setActiveModal("BYE");
                    }}
                    className="h-14 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 text-sm font-bold font-mono text-zinc-450 transition-all active:scale-95"
                  >
                    BYE
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTempRuns(1);
                      setActiveModal("LB");
                    }}
                    className="h-14 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 text-sm font-bold font-mono text-zinc-450 transition-all active:scale-95"
                  >
                    LB
                  </button>

                  {/* ROW 4: RUN OUT, STUMP, RETIRED, REVIEW */}
                  <button
                    type="button"
                    onClick={() => {
                      setOutBatterId(match.activeBatter1Id);
                      setNewBatterId("");
                      setWicketType("RUN_OUT");
                      setFielderId("");
                      setActiveModal("WICKET_FLOW");
                    }}
                    className="h-14 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 text-xs font-bold text-rose-500 tracking-wide transition-all active:scale-95"
                  >
                    RUN OUT
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOutBatterId(match.activeBatter1Id);
                      setWicketType("STUMPED");
                      setKeeperId("");
                      setActiveModal("WICKET_FLOW");
                    }}
                    className="h-14 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 text-xs font-bold text-rose-500 tracking-wide transition-all active:scale-95"
                  >
                    STUMP
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOutBatterId(match.activeBatter1Id);
                      setWicketType("RETIRED");
                      setActiveModal("WICKET_FLOW");
                    }}
                    className="h-14 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 text-xs font-bold text-zinc-450 tracking-wide transition-all active:scale-95"
                  >
                    RETIRED
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleScoreBall("CUSTOM", 0, 0, undefined, "REV")
                    }
                    className="h-14 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 text-xs font-bold text-rose-400/90 tracking-wide transition-all active:scale-95"
                  >
                    REVIEW
                  </button>
                </div>

                {/* ROW 5: NB + RUNS and WD + RUNS */}
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setTempRuns(1);
                      setActiveModal("NB_RUNS");
                    }}
                    className="h-14 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 text-xs font-bold tracking-wider uppercase text-zinc-455 transition-all active:scale-95"
                  >
                    NB + RUNS
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTempRuns(1);
                      setActiveModal("WD_RUNS");
                    }}
                    className="h-14 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 text-xs font-bold tracking-wider uppercase text-zinc-455 transition-all active:scale-95"
                  >
                    WD + RUNS
                  </button>
                </div>
              </div>

              {/* PREFERENCES PANEL */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 flex gap-4 text-xs font-sans text-zinc-550">
                <span className="font-semibold text-zinc-350">Quick Tip:</span>{" "}
                Any scorer console actions here will immediately propagate and
                mutate the central Redux state. Toggle to Scoreboard Page using
                the bottom left button to review the viewer's design!
              </div>
            </div>

            {/* RIGHT SIDE PANEL OF THE CONSOLE */}
            <div className="flex flex-col gap-6">
              <ScorerProjectedScore />
              <BatterTrendChart />
            </div>
          </div>

          {/* BOTTOM UTILITY ROW */}
          <div className="mt-4 p-4 rounded-2xl bg-zinc-900 border border-white/5 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={onViewScoreboard}
                className="px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-850 border border-white/5 text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                📊 Scoreboard Page
              </button>
              <button className="px-4 py-2 rounded-xl bg-zinc-950 text-zinc-500 border border-white/5 text-xs font-bold cursor-not-allowed">
                💬 Commentary View
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => dispatch(undoScore())}
                className="p-3 rounded-xl bg-zinc-950 border border-white/5 hover:border-white/10 hover:text-white transition-all text-zinc-405"
                title="Undo Last Action"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handlePubLive}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-extrabold uppercase shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <FolderSync className="w-4 h-4" />
                Publish Live Output
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAILED MODAL LAYER */}
      <AnimatePresence>
        {activeModal !== "NONE" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md rounded-2xl bg-zinc-900 border border-white/10 p-6 relative overflow-visible flex flex-col gap-4 font-sans"
            >
              <button
                onClick={() => setActiveModal("NONE")}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white cursor-pointer z-10"
              >
                <X className="w-4 h-4 shrink-0" />
              </button>

              {/* SQUAD PICKER MODALS (Modifies Team playing lineups before starting match) */}
              {(activeModal === "SQUAD_PICKER_A" ||
                activeModal === "SQUAD_PICKER_B") && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
                    Select Playing Squad (
                    {activeModal === "SQUAD_PICKER_A"
                      ? match.teamA.name
                      : match.teamB.name}
                    )
                  </h4>
                  <div className="relative mb-2">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-550 pointer-events-none">
                      <Search className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      placeholder="Search player name..."
                      value={
                        activeModal === "SQUAD_PICKER_A"
                          ? searchQueryA
                          : searchQueryB
                      }
                      onChange={(e) =>
                        activeModal === "SQUAD_PICKER_A"
                          ? setSearchQueryA(e.target.value)
                          : setSearchQueryB(e.target.value)
                      }
                      className="w-full pl-9 pr-3 py-2.5 bg-zinc-950 border border-white/5 rounded-xl font-sans text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="max-h-72 overflow-y-auto flex flex-col gap-1.5 pr-1 text-xs">
                    {(activeModal === "SQUAD_PICKER_A"
                      ? currentRosterA
                      : currentRosterB
                    )
                      .filter((p) =>
                        p.name
                          .toLowerCase()
                          .includes(
                            (activeModal === "SQUAD_PICKER_A"
                              ? searchQueryA
                              : searchQueryB
                            ).toLowerCase(),
                          ),
                      )
                      .map((p) => {
                        const targetList =
                          activeModal === "SQUAD_PICKER_A"
                            ? selectedXI_A
                            : selectedXI_B;
                        const isChosen = targetList.some(
                          (sel) => sel.id === p.id,
                        );
                        return (
                          <button
                            key={p.id}
                            onClick={() => {
                              const list =
                                activeModal === "SQUAD_PICKER_A"
                                  ? selectedXI_A
                                  : selectedXI_B;
                              const updater =
                                activeModal === "SQUAD_PICKER_A"
                                  ? setSelectedXI_A
                                  : setSelectedXI_B;
                              if (isChosen) {
                                updater(list.filter((sel) => sel.id !== p.id));
                              } else {
                                if (list.length >= 11) {
                                  alert(
                                    "Cannot choose more than 11 players for the Playing squad!",
                                  );
                                  return;
                                }
                                updater([...list, p]);
                              }
                            }}
                            className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                              isChosen
                                ? "bg-emerald-950/40 border-emerald-500/30 text-white"
                                : "bg-zinc-950 border-white/5 text-zinc-450 hover:bg-zinc-900"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                                <User className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="font-semibold block leading-tight">
                                  {p.name}
                                </span>
                                <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase">
                                  {p.role}
                                </span>
                              </div>
                            </div>
                            {isChosen && (
                              <Check className="w-4.5 h-4.5 text-emerald-400" />
                            )}
                          </button>
                        );
                      })}
                  </div>

                  <button
                    onClick={() => setActiveModal("NONE")}
                    className="w-full py-3 bg-zinc-950 hover:bg-zinc-850 rounded-xl font-bold uppercase tracking-wider text-[11px]"
                  >
                    Close & Confirm Selection
                  </button>
                </div>
              )}

              {/* MANUAL EVENTS OVERLAY (For Breaks, powerplays etc) */}
              {activeModal === "MANUAL_EVENTS" && (
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs font-bold text-cyan-400 tracking-wider uppercase leading-none">
                    Trigger Sports/Match Events
                  </h4>
                  <p className="text-[11px] text-zinc-550 leading-normal">
                    Manually trigger state alerts broadcasted to scoreboard
                    viewers:
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {[
                      { code: "POWERPLAY", label: "Powerplay Active" },
                      { code: "TIMEOUT", label: "Strategic Timeout" },
                      { code: "DRINKS", label: "Drinks Break" },
                      { code: "RAIN_DELAY", label: "Rain Delay" },
                      { code: "INNINGS_BREAK", label: "Innings Break" },
                      { code: "NORMAL", label: "Resume Live Play" },
                    ].map((ev) => (
                      <button
                        key={ev.code}
                        onClick={() => {
                          dispatch(triggerMatchFlowEvent(ev.code));
                          setActiveModal("NONE");
                        }}
                        className={`p-3 rounded-xl hover:bg-zinc-900 text-left text-xs font-bold flex items-center justify-between border cursor-pointer ${
                          match.matchEvent === ev.code
                            ? "bg-cyan-950/40 border-cyan-500/20 text-cyan-400"
                            : "bg-zinc-950 border-white/5 text-zinc-400"
                        }`}
                      >
                        {ev.label}
                      </button>
                    ))}
                  </div>

                  {/* Reset Entire Match Button */}
                  <div className="border-t border-white/5 pt-3 mt-2">
                    <button
                      onClick={() => {
                        dispatch(setActiveMatch(match.id));
                        setSetupStep(1);
                        setActiveModal("NONE");
                      }}
                      className="w-full py-3 rounded-xl bg-zinc-950 hover:bg-red-950/40 border border-red-500/10 hover:border-red-500/20 text-xs font-bold text-rose-455 uppercase transition-all flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-4 h-4 text-red-500" />
                      Reset Match & Run Setup Flow
                    </button>
                  </div>
                </div>
              )}

              {/* CHANGE BOWLER OVERLAY */}
              {activeModal === "CHANGE_BOWLER" && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
                    Select Bowler for Next Over
                  </h4>
                  <p className="text-[10px] text-zinc-500">
                    Pick any bowler from confirmed squad (cannot bowl
                    consecutive overs):
                  </p>

                  <div className="max-h-60 overflow-y-auto pr-1 flex flex-col gap-1.5 mt-2">
                    {activeInnings.bowlers
                      .filter((b) => b.playerId !== match.activeBowlerId)
                      .map((b) => (
                        <button
                          key={b.playerId}
                          onClick={() => handleBowlerSelect(b.playerId)}
                          className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-white/5 hover:border-cyan-500/25 transition-all text-xs font-medium text-white cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-cyan-400 font-semibold text-xs border border-white/5">
                              {b.name[0]}
                            </div>
                            <span className="text-zinc-200 font-bold">
                              {b.name}
                            </span>
                          </div>

                          <span className="text-[10px] font-semibold text-zinc-550 uppercase bg-zinc-900 px-2 py-0.5 rounded">
                            {b.role}
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* PROFESSIONAL WICKET FLOW DIALOG */}
              {activeModal === "WICKET_FLOW" && (
                <div className="flex flex-col gap-3.5">
                  <h4 className="text-xs font-bold text-rose-500 tracking-wider uppercase leading-none flex items-center gap-1.5">
                    <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
                    WICKET DISMISSAL WIZARD
                  </h4>
                  <p className="text-[11px] text-zinc-505 text-zinc-400">
                    Select precise dismissal metrics matching real cricket logs:
                  </p>

                  {/* 1. Dismissal Type radio layout */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      "BOWLED",
                      "CAUGHT",
                      "LBW",
                      "RUN_OUT",
                      "STUMPED",
                      "HIT_WICKET",
                      "RETIRED",
                    ].map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setWicketType(w)}
                        className={`py-2 px-1 text-[10px] font-bold rounded-lg border transition-all text-center uppercase cursor-pointer ${
                          wicketType === w
                            ? "bg-rose-955/60 bg-rose-950/80 border-red-500/30 text-rose-400"
                            : "bg-zinc-950 border-white/5 text-zinc-400 hover:bg-zinc-900"
                        }`}
                      >
                        {w.replace("_", " ")}
                      </button>
                    ))}
                  </div>

                  {/* 2. Dismissal Target selectors */}
                  <div className="bg-zinc-950 p-2.5 border border-white/5 rounded-xl flex flex-col gap-1">
                    <span className="text-[9px] font-semibold text-zinc-500 block uppercase">
                      Batter Out
                    </span>
                    <span className="text-xs font-bold text-white uppercase">
                      {activeInnings.batters.find(
                        (b) => b.playerId === outBatterId,
                      )?.name || "Striker"}
                    </span>
                  </div>

                  {/* 3. Conditional helpers based on Wicket Type */}
                  {wicketType === "CAUGHT" && (
                    <div className="flex flex-col gap-2">
                      <PremiumSelect
                        label="Select Fielder taking Catch"
                        placeholder="Choose Catch Fielder"
                        options={activeInnings.bowlers.map((b) => ({
                          id: b.playerId,
                          name: b.name,
                          role: b.role,
                        }))}
                        value={fielderId}
                        onChange={setFielderId}
                        teamColorTheme="rose"
                      />
                    </div>
                  )}

                  {wicketType === "RUN_OUT" && (
                    <div className="flex flex-col gap-1.5">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-zinc-500 font-bold uppercase">
                          Who was Run Out?
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: match.activeBatter1Id, tag: "Striker" },
                            { id: match.activeBatter2Id, tag: "Non-Striker" },
                          ].map((b) => (
                            <button
                              key={b.id}
                              type="button"
                              onClick={() => setOutBatterId(b.id)}
                              className={`py-2 px-1 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                                outBatterId === b.id
                                  ? "bg-rose-950/80 border-rose-500/30 text-rose-400"
                                  : "bg-zinc-950 border-white/5 text-zinc-550"
                              }`}
                            >
                              {activeInnings.batters.find(
                                (x) => x.playerId === b.id,
                              )?.name || b.tag}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mt-1">
                        <PremiumSelect
                          label="Select Thrown Fielder"
                          placeholder="Choose Thrower"
                          options={activeInnings.bowlers.map((b) => ({
                            id: b.playerId,
                            name: b.name,
                            role: b.role,
                          }))}
                          value={fielderId}
                          onChange={setFielderId}
                          teamColorTheme="rose"
                        />
                      </div>
                    </div>
                  )}

                  {wicketType === "STUMPED" && (
                    <div className="flex flex-col gap-2.5 font-sans">
                      <PremiumSelect
                        label="Select Keeper"
                        placeholder="Choose Keeper"
                        options={activeInnings.bowlers
                          .filter(
                            (p) =>
                              p.role === "WICKET_KEEPER" ||
                              p.role === "ALL_ROUNDER",
                          )
                          .map((b) => ({
                            id: b.playerId,
                            name: b.name,
                            role: b.role,
                          }))}
                        value={keeperId}
                        onChange={setKeeperId}
                        teamColorTheme="rose"
                      />
                    </div>
                  )}

                  {/* 4. Select Incoming Batter */}
                  <div className="flex flex-col gap-2">
                    <PremiumSelect
                      label="Select New Batter (incoming)"
                      placeholder="Select Incoming Batter"
                      options={activeInnings.batters
                        .filter(
                          (p) =>
                            !p.battingStats?.isOut &&
                            p.playerId !== match.activeBatter1Id &&
                            p.playerId !== match.activeBatter2Id,
                        )
                        .map((p) => ({
                          id: p.playerId,
                          name: p.name,
                          role: p.role,
                        }))}
                      value={newBatterId}
                      onChange={setNewBatterId}
                      teamColorTheme="rose"
                    />
                  </div>

                  {/* 5. Master confirm dismissals button */}
                  <button
                    onClick={handleWicketConfirm}
                    className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-[11px] uppercase tracking-wider rounded-xl shadow-lg shadow-rose-950/20 active:scale-95 transition-all cursor-pointer block mt-2 animate-pulse"
                  >
                    Confirm Wicket Dismissal
                  </button>
                </div>
              )}

              {/* BYE / LB / WD / NB Runs specifying modals */}
              {(activeModal === "BYE" ||
                activeModal === "LB" ||
                activeModal === "WD_RUNS" ||
                activeModal === "NB_RUNS") && (
                <div className="flex flex-col gap-4 font-sans">
                  <h4 className="text-sm font-bold text-zinc-450 uppercase tracking-widest leading-none text-zinc-400">
                    SPECIFY RUNS ({activeModal.replace("_", " ")})
                  </h4>
                  <p className="text-xs text-zinc-550">
                    Runs to award off this extra ball event:
                  </p>

                  <div className="flex items-center gap-3 justify-center py-4">
                    <button
                      onClick={() => setTempRuns((r) => Math.max(1, r - 1))}
                      className="w-10 h-10 rounded-full bg-zinc-950 hover:bg-zinc-800 border border-white/5 flex items-center justify-center font-bold text-zinc-405 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-3xl font-extrabold text-white font-mono w-12 text-center">
                      {tempRuns}
                    </span>
                    <button
                      onClick={() => setTempRuns((r) => r + 1)}
                      className="w-10 h-10 rounded-full bg-zinc-950 hover:bg-zinc-800 border border-white/5 flex items-center justify-center font-bold text-zinc-405 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      if (activeModal === "BYE")
                        handleScoreBall("BYE", 0, tempRuns);
                      else if (activeModal === "LB")
                        handleScoreBall("LB", 0, tempRuns);
                      else if (activeModal === "WD_RUNS")
                        handleScoreBall("WD_RUNS", 0, tempRuns);
                      else if (activeModal === "NB_RUNS")
                        handleScoreBall("NB_RUNS", tempRuns);

                      setTempRuns(1);
                      setActiveModal("NONE");
                    }}
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase transition-all cursor-pointer"
                  >
                    CONFIRM EXTRA BALL ACTION
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScorerConsolePage;
