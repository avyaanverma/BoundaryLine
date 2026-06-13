import { useSelector } from "react-redux";
import { BrainCircuit, TrendingUp, AlertTriangle } from "lucide-react";

export const AiInsights = () => {
  const match = useSelector((state) => state.match.currentMatch);
  return (
    <div className="p-5 rounded-2xl bg-zinc-950/40 backdrop-blur-md border border-emerald-500/10 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="p-1 rounded-lg bg-emerald-950/50 border border-emerald-500/20">
          <BrainCircuit className="w-4 h-4 text-emerald-400" />
        </div>
        <h3 className="text-xs font-bold tracking-widest text-emerald-400 font-display uppercase">
          AI INSIGHT
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {match.aiInsights.map((insight, idx) => {
          const isBowler = insight.toLowerCase().includes("bowler");
          return (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/60 border border-white/5"
            >
              <div className="mt-0.5 shrink-0">
                {isBowler ? (
                  <TrendingUp className="w-4 h-4 text-emerald-400 animate-pulse" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                )}
              </div>
              <div className="text-xs leading-relaxed text-zinc-300">
                <span className="font-semibold text-white block mb-0.5">
                  {isBowler ? "Bowler Velocity rising" : "Batter Matchup alert"}
                </span>
                {insight}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AiInsights;
