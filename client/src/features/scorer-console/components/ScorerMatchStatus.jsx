import { useSelector } from "react-redux";
import { Circle } from "lucide-react";

export const ScorerMatchStatus = () => {
  const match = useSelector((state) => state.match.currentMatch);
  const activeInnings = match.innings[match.currentInningsNum - 1];

  const target = match.target || 208;
  const crr = activeInnings.overs > 0 || activeInnings.balls > 0
    ? (activeInnings.runs / (activeInnings.overs + activeInnings.balls / 6)).toFixed(2)
    : "0.00";

  const totalInningsBalls = 120;
  const ballsBowled = activeInnings.overs * 6 + activeInnings.balls;
  const ballsRemaining = Math.max(0, totalInningsBalls - ballsBowled);
  const runsNeeded = Math.max(0, target - activeInnings.runs);
  const rrr = ballsRemaining > 0 ? ((runsNeeded / ballsRemaining) * 6).toFixed(2) : "0.00";

  // Batters lists
  const batter1 = activeInnings.batters.find((b) => b.playerId === match.activeBatter1Id);
  const batter2 = activeInnings.batters.find((b) => b.playerId === match.activeBatter2Id);
  const bowler = activeInnings.bowlers.find((b) => b.playerId === match.activeBowlerId);

  return (
    <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
      {/* Left side: Team & Score */}
      <div className="flex flex-col gap-1 shrink-0">
        <div className="flex items-center gap-2">
          {/* Logo emblem */}
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center text-[10px] font-bold text-black uppercase">
            {match.teamA.shortName[0]}
          </div>
          <span className="text-lg font-bold text-white">{match.teamA.name}</span>
        </div>

        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-black text-white font-sans tracking-tight">
            {activeInnings.runs}/{activeInnings.wickets}
          </span>
          <span className="text-sm font-semibold text-zinc-500 font-mono">
            ({activeInnings.overs}.{activeInnings.balls})
          </span>
        </div>

        <div className="flex items-center gap-3 mt-2 text-[11px] font-mono font-bold text-zinc-500 tracking-wider">
          <span>CRR: <span className="text-white">{crr}</span></span>
          <span className="text-zinc-700">•</span>
          <span>RRR: <span className="text-emerald-400">{rrr}</span></span>
          <span className="text-zinc-700">•</span>
          <span>TARGET: <span className="text-zinc-300">{target}</span></span>
        </div>
      </div>

      {/* Right side: Batter & Bowler tracking details */}
      <div className="flex-1 max-w-md bg-zinc-950/70 rounded-xl p-4 border border-white/5 divide-y divide-white/5 font-sans">
        {/* Batter 1 */}
        <div className="flex items-center justify-between pb-2">
          <span className="text-xs font-semibold text-white flex items-center gap-1">
            {batter1 ? batter1.name : "Rohit Sharma"}
            <span className="text-emerald-400 animate-pulse text-base leading-none">*</span>
          </span>
          <div className="flex items-baseline gap-3 text-xs">
            <span className="font-mono font-bold text-white">
              {batter1?.battingStats?.runs ?? 42}
            </span>
            <span className="font-mono text-zinc-500">
              ({batter1?.battingStats?.balls ?? 28})
            </span>
            <span className="text-[10px] font-mono text-zinc-600 bg-zinc-900 border border-white/5 px-1.5 py-0.5 rounded">
              SR: {batter1?.battingStats ? ((batter1.battingStats.runs / batter1.battingStats.balls) * 100).toFixed(1) : "150.0"}
            </span>
          </div>
        </div>

        {/* Batter 2 */}
        <div className="flex items-center justify-between py-2">
          <span className="text-xs text-zinc-400">
            {batter2 ? batter2.name : "Surya Kumar"}
          </span>
          <div className="flex items-baseline gap-3 text-xs">
            <span className="font-mono font-semibold text-zinc-300">
              {batter2?.battingStats?.runs ?? 12}
            </span>
            <span className="font-mono text-zinc-500">
              ({batter2?.battingStats?.balls ?? 8})
            </span>
            <span className="text-[10px] font-mono text-zinc-600 bg-zinc-900 border border-white/5 px-1.5 py-0.5 rounded">
              SR: {batter2?.battingStats ? ((batter2.battingStats.runs / batter2.battingStats.balls) * 100).toFixed(1) : "150.0"}
            </span>
          </div>
        </div>

        {/* Bowler */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-cyan-400 flex items-center gap-1.5 font-medium">
            <Circle className="w-2.5 h-2.5 fill-cyan-400/20 text-cyan-400 animate-pulse" />
            {bowler ? bowler.name : "Bumrah"}
          </span>
          <div className="text-xs font-mono font-semibold text-zinc-400">
            {bowler?.bowlingStats 
              ? `${bowler.bowlingStats.overs}.${bowler.bowlingStats.balls}-${bowler.bowlingStats.maidens}-${bowler.bowlingStats.runsConceded}-${bowler.bowlingStats.wickets}`
              : "3.2-0-28-1"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorerMatchStatus;
