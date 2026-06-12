import { useDispatch } from "react-redux";
import ScorerMatchStatus from "./ScorerMatchStatus.jsx";
import ScorerProjectedScore from "./ScorerProjectedScore.jsx";
import BatterTrendChart from "./BatterTrendChart.jsx";
import OverTimeline from "../../scoreboard/components/OverTimeline.jsx";
import WinProbability from "../../scoreboard/components/WinProbabbility.jsx";
import { swapStrike, undoScore } from "../../scoreboard/store/mathSlice.js";
import { ArrowRight, FolderSync, RotateCcw } from "lucide-react";
import { motion } from "motion/react";

/**
 * LiveScoringPanel component extract from ScorerConsolePage
 */
export const LiveScoringPanel = ({
  match,
  activeInnings,
  dispatch,
  setActiveModal,
  handleScoreBall,
  handlePubLive,
  handleBowlerSelect,
  onViewScoreboard,
  setOutBatterId,
  setNewBatterId,
  setWicketType,
  setFielderId,
  setKeeperId,
  initWicketFlow,
  setSetupStep,
  tempRuns,
  setTempRuns,
}) => {
  const localDispatch = useDispatch();
  const activeDispatch = dispatch || localDispatch;

  return (
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
              <h4 className="text-sm font-extrabold text-white">Over Completed successfully!</h4>
              <p className="text-xs text-zinc-455 mt-0.5">Please appoint a new bowler to bowl the subsequent over. Consecutive overs from one bowler are blocked.</p>
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
        <OverTimeline balls={match.thisOver} label={`OVER ${activeInnings.overs}`} />
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
                  onClick={() => activeDispatch(swapStrike())}
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
                onClick={initWicketFlow}
                className="h-20 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-red-500/20 hover:border-red-500/30 text-base font-extrabold font-sans tracking-wide transition-all active:scale-95 cursor-pointer flex items-center justify-center text-red-400 shadow-lg shadow-rose-950/45"
              >
                WICKET
              </button>

              {/* ROW 3: WD, NB, BYE, LB */}
              <button
                type="button"
                onClick={() => handleScoreBall("WD", 0)}
                className="h-14 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 text-sm font-bold font-mono text-zinc-455 transition-all active:scale-95"
              >
                WD
              </button>
              <button
                type="button"
                onClick={() => handleScoreBall("NB", 0)}
                className="h-14 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 text-sm font-bold font-mono text-zinc-455 transition-all active:scale-95"
              >
                NB
              </button>
              <button
                type="button"
                onClick={() => { setTempRuns(1); setActiveModal("BYE"); }}
                className="h-14 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 text-sm font-bold font-mono text-zinc-455 transition-all active:scale-95"
              >
                BYE
              </button>
              <button
                type="button"
                onClick={() => { setTempRuns(1); setActiveModal("LB"); }}
                className="h-14 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 text-sm font-bold font-mono text-zinc-455 transition-all active:scale-95"
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
                onClick={() => handleScoreBall("CUSTOM", 0, 0, undefined, "REV")}
                className="h-14 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 text-xs font-bold text-rose-400/90 tracking-wide transition-all active:scale-95"
              >
                REVIEW
              </button>
            </div>

            {/* ROW 5: NB + RUNS and WD + RUNS */}
            <div className="grid grid-cols-2 gap-3 mt-1">
              <button
                type="button"
                onClick={() => { setTempRuns(1); setActiveModal("NB_RUNS"); }}
                className="h-14 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 text-xs font-bold tracking-wider uppercase text-zinc-455 transition-all active:scale-95"
              >
                NB + RUNS
              </button>
              <button
                type="button"
                onClick={() => { setTempRuns(1); setActiveModal("WD_RUNS"); }}
                className="h-14 rounded-xl bg-zinc-950 hover:bg-zinc-850/80 border border-white/5 text-xs font-bold tracking-wider uppercase text-zinc-455 transition-all active:scale-95"
              >
                WD + RUNS
              </button>
            </div>
          </div>

          {/* PREFERENCES PANEL */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 flex gap-4 text-xs font-sans text-zinc-550">
            <span className="font-semibold text-zinc-350">Quick Tip:</span> Any scorer console actions here will immediately propagate and mutate the central Redux state. Toggle to Scoreboard Page using the bottom left button to review the viewer's design!
          </div>
        </div>

        {/* RIGHT SIDE PANEL OF THE CONSOLE */}
        <div className="flex flex-col gap-6">
          <WinProbability
            teamAName={match.teamA.shortName}
            teamBName={match.teamB.shortName}
            teamAPct={match.winProbability.teamA}
            teamBPct={match.winProbability.teamB}
            trendText={match.winProbability.trend}
          />
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
            onClick={() => activeDispatch(undoScore())}
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
  );
};

export default LiveScoringPanel;
