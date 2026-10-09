import { useMemo } from "react";
import { Award, Sparkles } from "lucide-react";

/**
 * TopPerformers — shows standout batter and bowler from the match.
 * Accepts optional `scores` and `match` from backend.
 * Falls back to a minimal display when no score data is available.
 */
export const TopPerformers = ({ scores = [] }) => {
  // Compute top performer hints from score aggregates
  const { topRuns, bestBowling } = useMemo(() => {
    if (scores.length === 0) return { topRuns: null, bestBowling: null };
    
    // Find innings with most runs
    const sorted = [...scores].sort((a, b) => (b.score || 0) - (a.score || 0));
    const topRunsEntry = sorted[0];
    
    // Find innings with most wickets (bowling performance)
    const mostWickets = [...scores].sort((a, b) => (b.wickets || 0) - (a.wickets || 0));
    const bestBowlingEntry = mostWickets[0];
    
    return {
      topRuns: topRunsEntry
        ? {
            score: topRunsEntry.score || 0,
            wickets: topRunsEntry.wickets || 0,
            overs: topRunsEntry.overs || "0.0",
            runRate: topRunsEntry.runRate || 0,
            teamName: topRunsEntry.battingTeam?.shortName || topRunsEntry.battingTeam?.name || `Innings ${topRunsEntry.innings}`,
          }
        : null,
      bestBowling: bestBowlingEntry
        ? {
            wickets: bestBowlingEntry.wickets || 0,
            runs: bestBowlingEntry.score || 0,
            overs: bestBowlingEntry.overs || "0.0",
            teamName: bestBowlingEntry.battingTeam?.shortName || bestBowlingEntry.battingTeam?.name || `Innings ${bestBowlingEntry.innings}`,
          }
        : null,
    };
  }, [scores]);

  if (!topRuns && !bestBowling) {
    return (
      <div className="p-5 rounded-2xl glass-card border border-white/5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold tracking-widest text-zinc-400 font-sans uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            Top Performers
          </h3>
        </div>
        <p className="text-xs text-zinc-600 italic text-center py-4">Waiting for match data...</p>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl glass-card border border-white/5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold tracking-widest text-zinc-400 font-sans uppercase flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          Top Performers
        </h3>
      </div>
      <div className="flex flex-col gap-3">
        {/* Top Scoring Team */}
        {topRuns && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-extrabold uppercase">
                {topRuns.teamName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{topRuns.teamName}</h4>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  {topRuns.score}/{topRuns.wickets} <span className="text-zinc-600">•</span> RR: {topRuns.runRate.toFixed(2)}
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider bg-amber-950/40 border border-amber-500/30 text-amber-400 uppercase">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              TOP
            </span>
          </div>
        )}

        {/* Best Bowling Team */}
        {bestBowling && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm font-extrabold uppercase">
                {bestBowling.teamName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{bestBowling.teamName}</h4>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  {bestBowling.overs}-{bestBowling.wickets}-{bestBowling.runs} <span className="text-zinc-600">•</span> Econ: {((bestBowling.runs || 0) / (parseFloat(bestBowling.overs) || 1)).toFixed(2)}
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-zinc-800 text-zinc-400 border border-white/5 uppercase">
              BOWLING
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopPerformers;
