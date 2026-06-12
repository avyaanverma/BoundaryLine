import { AnimatePresence, motion } from "motion/react";
import PremiumSelect from "./PremiumSelect.jsx";
import {
  setActiveMatch,
  triggerMatchFlowEvent,
} from "../../scoreboard/store/mathSlice.js";
import {
  ShieldAlert,
  X,
  Search,
  User,
  Check,
  RotateCcw,
} from "lucide-react";
/**
 * ScorerModals component containing all modal layers.
 */
export const ScorerModals = ({
  match,
  activeInnings,
  activeModal,
  setActiveModal,
  dispatch,
  tempRuns,
  setTempRuns,
  wicketType,
  setWicketType,
  outBatterId,
  setOutBatterId,
  fielderId,
  setFielderId,
  keeperId,
  setKeeperId,
  newBatterId,
  setNewBatterId,
  confirmWicket,
  handleBowlerSelect,
  handleScoreBall,
  selectedXI_A,
  selectedXI_B,
  currentRosterA,
  currentRosterB,
  searchQueryA,
  setSearchQueryA,
  searchQueryB,
  setSearchQueryB,
  setSelectedXI_A,
  setSelectedXI_B,
  setSetupStep,
  triggerMatchFlowEvent: parentTriggerMatchFlowEvent,
}) => {
  return (
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
            {(activeModal === "SQUAD_PICKER_A" || activeModal === "SQUAD_PICKER_B") && (
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
                  Select Playing Squad ({activeModal === "SQUAD_PICKER_A" ? match.teamA.name : match.teamB.name})
                </h4>
                <div className="relative mb-2">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-550 pointer-events-none">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search player name..."
                    value={activeModal === "SQUAD_PICKER_A" ? searchQueryA : searchQueryB}
                    onChange={(e) => activeModal === "SQUAD_PICKER_A" ? setSearchQueryA(e.target.value) : setSearchQueryB(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-zinc-950 border border-white/5 rounded-xl font-sans text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="max-h-72 overflow-y-auto flex flex-col gap-1.5 pr-1 text-xs">
                  {(activeModal === "SQUAD_PICKER_A" ? currentRosterA : currentRosterB)
                    .filter((p) => p.name.toLowerCase().includes((activeModal === "SQUAD_PICKER_A" ? searchQueryA : searchQueryB).toLowerCase()))
                    .map((p) => {
                      const targetList = activeModal === "SQUAD_PICKER_A" ? selectedXI_A : selectedXI_B;
                      const isChosen = targetList.some((sel) => sel.id === p.id);
                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            const list = activeModal === "SQUAD_PICKER_A" ? selectedXI_A : selectedXI_B;
                            const updater = activeModal === "SQUAD_PICKER_A" ? setSelectedXI_A : setSelectedXI_B;
                            if (isChosen) {
                              updater(list.filter((sel) => sel.id !== p.id));
                            } else {
                              if (list.length >= 11) {
                                alert("Cannot choose more than 11 players for the Playing squad!");
                                return;
                              }
                              updater([...list, p]);
                            }
                          }}
                          className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                            isChosen
                              ? "bg-emerald-950/40 border-emerald-500/30 text-white"
                              : "bg-zinc-950 border-white/5 text-zinc-455 hover:bg-zinc-900"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                              <User className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-semibold block leading-tight">{p.name}</span>
                              <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase">{p.role}</span>
                            </div>
                          </div>
                          {isChosen && <Check className="w-4.5 h-4.5 text-emerald-400" />}
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
                <p className="text-[11px] text-zinc-555 leading-normal">Manually trigger state alerts broadcasted to scoreboard viewers:</p>

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
                <p className="text-[10px] text-zinc-500">Pick any bowler from confirmed squad (cannot bowl consecutive overs):</p>
                
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
                          <span className="text-zinc-200 font-bold">{b.name}</span>
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
                <p className="text-[11px] text-zinc-505 text-zinc-400">Select precise dismissal metrics matching real cricket logs:</p>

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
                          ? "bg-rose-955/60 bg-rose-950/80 border-red-500/30 text-rose-450"
                          : "bg-zinc-950 border-white/5 text-zinc-400 hover:bg-zinc-900"
                      }`}
                    >
                      {w.replace("_", " ")}
                    </button>
                  ))}
                </div>

                {/* 2. Dismissal Target selectors */}
                <div className="bg-zinc-950 p-2.5 border border-white/5 rounded-xl flex flex-col gap-1">
                  <span className="text-[9px] font-semibold text-zinc-500 block uppercase">Batter Out</span>
                  <span className="text-xs font-bold text-white uppercase">{activeInnings.batters.find(b => b.playerId === outBatterId)?.name || "Striker"}</span>
                </div>

                {/* 3. Conditional helpers based on Wicket Type */}
                {wicketType === "CAUGHT" && (
                  <div className="flex flex-col gap-2">
                    <PremiumSelect
                      label="Select Fielder taking Catch"
                      placeholder="Choose Catch Fielder"
                      options={activeInnings.bowlers.map((b) => ({ id: b.playerId, name: b.name, role: b.role }))}
                      value={fielderId}
                      onChange={setFielderId}
                      teamColorTheme="rose"
                    />
                  </div>
                )}

                {wicketType === "RUN_OUT" && (
                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-zinc-500 font-bold uppercase">Who was Run Out?</label>
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
                            {activeInnings.batters.find(x => x.playerId === b.id)?.name || b.tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-1">
                      <PremiumSelect
                        label="Select Thrown Fielder"
                        placeholder="Choose Thrower"
                        options={activeInnings.bowlers.map((b) => ({ id: b.playerId, name: b.name, role: b.role }))}
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
                        .filter(p => p.role === "WICKET_KEEPER" || p.role === "ALL_ROUNDER")
                        .map((b) => ({ id: b.playerId, name: b.name, role: b.role }))}
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
                      .filter((p) => !p.battingStats?.isOut && p.playerId !== match.activeBatter1Id && p.playerId !== match.activeBatter2Id)
                      .map((p) => ({ id: p.playerId, name: p.name, role: p.role }))}
                    value={newBatterId}
                    onChange={setNewBatterId}
                    teamColorTheme="rose"
                  />
                </div>

                {/* 5. Master confirm dismissals button */}
                <button
                  onClick={confirmWicket}
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
                    className="w-10 h-10 rounded-full bg-zinc-950 hover:bg-zinc-800 border border-white/5 flex items-center justify-center font-bold text-zinc-455 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-3xl font-extrabold text-white font-mono w-12 text-center">
                    {tempRuns}
                  </span>
                  <button
                    onClick={() => setTempRuns((r) => r + 1)}
                    className="w-10 h-10 rounded-full bg-zinc-950 hover:bg-zinc-800 border border-white/5 flex items-center justify-center font-bold text-zinc-455 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (activeModal === "BYE") handleScoreBall("BYE", 0, tempRuns);
                    else if (activeModal === "LB") handleScoreBall("LB", 0, tempRuns);
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
  );
};

export default ScorerModals;
