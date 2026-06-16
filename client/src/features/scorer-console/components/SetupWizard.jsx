import { setActiveMatch, loadExternalMatch } from "../../scoreboard/store/mathSlice.js";
import PremiumSelect from "./PremiumSelect.jsx";
import { ArrowRight, Award, FolderSync, Play, Users, Loader2, Database } from "lucide-react";
/**
 * SetupWizard component extract from ScorerConsolePage
 */
export const SetupWizard = ({
  match,
  matchesList,
  backendMatches = [],
  backendMatchesLoading = false,
  dispatch,
  currentRosterA,
  currentRosterB,
  selectedXI_A,
  selectedXI_B,
  setActiveModal,
  setupStep,
  setSetupStep,
  tossWinner,
  setTossWinner,
  tossDecision,
  setTossDecision,
  newMatchTitle,
  setNewMatchTitle,
  newTeamAName,
  setNewTeamAName,
  newTeamBName,
  setNewTeamBName,
  newPlayerName,
  setNewPlayerName,
  newPlayerRole,
  setNewPlayerRole,
  wizardStrikerId,
  setWizardStrikerId,
  wizardNonStrikerId,
  setWizardNonStrikerId,
  wizardBowlerId,
  setWizardBowlerId,
  handleCreateDynamicMatch,
  handleAddManualPlayer,
  handleXLSXImportSimulation,
  initWizardOpeningRoles,
  handleStartMatch,
}) => {
  return (
    <div className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6 flex flex-col gap-5">
      <div className="p-6 md:p-8 rounded-2xl bg-zinc-900/95 border border-zinc-800/80 flex flex-col gap-5 relative shadow-[0_32px_64px_-16px_rgba(0,0,0,0.85)] overflow-visible">
        
        <div className="flex justify-between items-start pb-4 border-b border-zinc-800">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              Official Match Control Center
            </h2>
            <p className="text-[11px] text-zinc-400">Configure team rosters, toss coordinates, and initiate live game feeds.</p>
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
                  <span className="text-xs font-black text-white tracking-wide uppercase">Select Preloaded Match</span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-normal">
                  Pick any existing active fixture from the database to initialize setup metrics.
                </p>

                <div className="flex flex-col gap-2 mt-2">
                  <label className="text-[10px] text-zinc-550 uppercase font-black tracking-wider block">Backend Matches (from API)</label>
                  <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1">
                    {backendMatchesLoading ? (
                      <div className="flex items-center justify-center py-6 gap-2 text-zinc-500">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-xs">Loading matches...</span>
                      </div>
                    ) : backendMatches.length === 0 ? (
                      <div className="py-6 text-center text-zinc-600 text-xs italic">
                        No matches found in backend. Create one in the Admin Panel first.
                      </div>
                    ) : (
                      backendMatches.map((m) => {
                        const matchId = m._id || m.id;
                        const isSelected = matchId === match.id;
                        return (
                          <button
                            key={matchId}
                            type="button"
                            onClick={() => {
                              dispatch(loadExternalMatch({ match: m }));
                            }}
                            className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                              isSelected
                                ? "bg-emerald-950/30 border-emerald-500/40 text-white"
                                : "bg-zinc-900/60 border-white/5 text-zinc-400 hover:border-zinc-800 hover:text-white"
                            }`}
                          >
                            <div>
                              <span className="font-extrabold block text-xs leading-none">
                                {(m.teamA?.shortName || m.team1?.shortName || "T1")}{" "}
                                <span className="text-emerald-400/80">vs</span>{" "}
                                {(m.teamB?.shortName || m.team2?.shortName || "T2")}
                              </span>
                              <span className="text-[9px] text-zinc-500 font-mono italic mt-1 block">
                                {m.venue || ""} &bull; {m.status || "UPCOMING"}
                              </span>
                            </div>
                            {isSelected && (
                              <span className="px-2 py-0.5 rounded text-[8px] font-mono font-bold tracking-widest bg-emerald-500/10 text-emerald-400 uppercase">
                                Current
                              </span>
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>

                  {/* Divider */}
                  {matchesList.length > 0 && (
                    <>
                      <div className="flex items-center gap-2 my-1">
                        <div className="h-px flex-1 bg-zinc-800"></div>
                        <span className="text-[9px] text-zinc-600 font-mono uppercase">or local</span>
                        <div className="h-px flex-1 bg-zinc-800"></div>
                      </div>
                      <label className="text-[10px] text-zinc-550 uppercase font-black tracking-wider block">Local Scorer Matches</label>
                      <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
                        {matchesList.map((m) => {
                          const isSelected = m.id === match.id;
                          return (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => {
                                dispatch(setActiveMatch(m.id));
                              }}
                              className={`p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                                isSelected
                                  ? "bg-cyan-950/30 border-cyan-500/40 text-white"
                                  : "bg-zinc-900/60 border-white/5 text-zinc-400 hover:border-zinc-800 hover:text-white"
                              }`}
                            >
                              <span className="font-bold text-[10px]">{m.teamA?.name || "A"} <span className="text-zinc-600">vs</span> {m.teamB?.name || "B"}</span>
                              {isSelected && (
                                <span className="px-1.5 py-0.5 rounded text-[7px] font-mono font-bold bg-cyan-500/10 text-cyan-400 uppercase">Curr</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Custom Creation Column */}
              <form onSubmit={handleCreateDynamicMatch} className="flex flex-col gap-4 p-5 bg-zinc-950/40 rounded-xl border border-zinc-850">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-xs font-black text-white tracking-wide uppercase">Create Custom Match</span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-normal">
                  Remove preconfigured systems. Configure new visual titles and dynamic team labels.
                </p>

                <div className="flex flex-col gap-3 mt-1">
                  <div>
                    <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block mb-1">Match Title / Tournament</label>
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
                      <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block mb-1">Team A Name</label>
                      <input
                        type="text"
                        placeholder="e.g., Royal Challengers"
                        value={newTeamAName}
                        onChange={(e) => setNewTeamAName(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-900 border border-white/5 rounded-lg text-xs font-sans focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block mb-1">Team B Name</label>
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
              <span className="text-[10px] text-zinc-500 font-medium">Selected current target: <span className="font-bold text-white uppercase">{match.teamA.name} vs {match.teamB.name}</span></span>
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
                  <span className="text-xs font-extrabold text-emerald-400 tracking-wide uppercase">{match.teamA.name} Pool ({currentRosterA.length})</span>
                  <button
                    type="button"
                    onClick={() => handleXLSXImportSimulation("A")}
                    className="py-1 px-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-emerald-400 font-semibold text-[9px] uppercase rounded"
                    title="Prepare / parse mock xlsx roster data"
                  >
                    XLSX Bulk Import
                  </button>
                </div>
                <div className="max-h-40 overflow-y-auto flex flex-col gap-1.5 scrollbar-thin">
                  {currentRosterA.length === 0 ? (
                    <div className="py-6 text-center text-zinc-650 text-xs italic">
                      Roster is empty. Enter players manually or use XLSX simulator.
                    </div>
                  ) : (
                    currentRosterA.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800/40 text-xs">
                        <span className="font-medium text-zinc-300">{p.name}</span>
                        <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-950 text-emerald-400 uppercase tracking-widest leading-none">{p.role}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Team B Roster Column */}
              <div className="flex flex-col gap-3 p-4 bg-zinc-950/50 rounded-xl border border-zinc-850">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-400 tracking-wide uppercase">{match.teamB.name} Pool ({currentRosterB.length})</span>
                  <button
                    type="button"
                    onClick={() => handleXLSXImportSimulation("B")}
                    className="py-1 px-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-emerald-400 font-semibold text-[9px] uppercase rounded"
                    title="Prepare / parse mock xlsx roster data"
                  >
                    XLSX Bulk Import
                  </button>
                </div>
                <div className="max-h-40 overflow-y-auto flex flex-col gap-1.5 scrollbar-thin">
                  {currentRosterB.length === 0 ? (
                    <div className="py-6 text-center text-zinc-650 text-xs italic">
                      Roster is empty. Enter players manually or use XLSX simulator.
                    </div>
                  ) : (
                    currentRosterB.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800/40 text-xs">
                        <span className="font-medium text-zinc-300">{p.name}</span>
                        <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-950 text-emerald-400 uppercase tracking-widest leading-none">{p.role}</span>
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
                <span className="text-xs font-black text-white tracking-wide uppercase">Register Single Profile</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="md:col-span-2">
                  <label className="text-[10px] text-zinc-500 uppercase font-black tracking-wider block mb-1">Full Player Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Jasprit Bumrah"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/5 rounded-lg text-xs font-sans focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-500 uppercase font-black tracking-wider block mb-1">Assigned Role</label>
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
              onClick={() => handleXLSXImportSimulation("A")}
              className="p-5 bg-zinc-950/20 rounded-xl border border-dashed border-zinc-800 hover:border-emerald-500/50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <FolderSync className="w-6 h-6 text-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-zinc-300">Bulk XLSX Upload Simulation (Click to Trigger)</span>
              <p className="text-[10px] text-zinc-550 text-center leading-normal max-w-sm">
                Upload sheet columns containing [Player Name, Role, Team] to mass import rosters. Click here to instantly parsing bulk demo.
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
                  if (currentRosterA.length < 5 || currentRosterB.length < 5) {
                    alert("Please register at least 5 players to both roster pools before launching play!");
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
                <span className="text-xs font-bold text-zinc-350 tracking-wide uppercase">Toss Coordinates</span>
                <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Select Toss Winner</label>
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
                <span className="text-xs font-bold text-zinc-350 tracking-wide uppercase">Decision Metric</span>
                <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Select Choice</label>
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
              <span className="font-bold text-emerald-400 block mb-0.5">Rosters Confirmed</span>
              Lineups for both teams are unlocked. You may personalize squad selections on the next partition.
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
                  <span className="text-xs font-bold text-white uppercase">{match.teamA.name} Squad ({selectedXI_A.length}/11)</span>
                  <button
                    onClick={() => setActiveModal("SQUAD_PICKER_A")}
                    className="py-1 px-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-emerald-400 font-semibold text-[10px] uppercase rounded hover:bg-zinc-850 cursor-pointer"
                  >
                    Modify XI
                  </button>
                </div>
                <div className="max-h-56 overflow-y-auto pr-1 flex flex-col gap-1.5 scrollbar-thin">
                  {selectedXI_A.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800/40 text-xs">
                      <span className="font-medium text-zinc-300">{p.name}</span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-950 text-emerald-400 border border-zinc-800/80">{p.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team B Picker */}
              <div className="flex flex-col gap-3 p-4 bg-zinc-950/60 rounded-xl border border-zinc-800/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase">{match.teamB.name} Squad ({selectedXI_B.length}/11)</span>
                  <button
                    onClick={() => setActiveModal("SQUAD_PICKER_B")}
                    className="py-1 px-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-emerald-400 font-semibold text-[10px] uppercase rounded hover:bg-zinc-850 cursor-pointer"
                  >
                    Modify XI
                  </button>
                </div>
                <div className="max-h-56 overflow-y-auto pr-1 flex flex-col gap-1.5 scrollbar-thin">
                  {selectedXI_B.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-800/40 text-xs">
                      <span className="font-medium text-zinc-300">{p.name}</span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-950 text-emerald-400 border border-zinc-800/80">{p.role}</span>
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
                onClick={handleStartMatch}
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
  );
};

export default SetupWizard;
