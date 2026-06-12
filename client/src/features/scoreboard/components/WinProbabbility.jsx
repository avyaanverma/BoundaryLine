import { MoveUpRight } from "lucide-react";

export const WinProbability = ({
  teamAName,
  teamBName,
  teamAPct,
  teamBPct,
  trendText,
}) => {
  return (
    <div className="p-5 rounded-2xl glass-card border border-white/5 flex flex-col gap-4">
      <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-zinc-400 font-sans uppercase">
        <MoveUpRight className="w-4 h-4 text-emerald-400" />
        Win Probability
      </div>
      {/* Percentage slider */}
      <div className="w-full flex items-center justify-between font-mono text-sm font-semibold mb-1">
        <span className="text-emerald-400">{teamAName} {teamAPct}%</span>
        <span className="text-zinc-500">{teamBPct}% {teamBName}</span>
      </div>

      <div className="w-full h-8 rounded-xl bg-zinc-900 border border-white/5 overflow-hidden flex">
        {/* Team A share */}
        <div
          className="h-full bg-gradient-to-r from-emerald-600 to-green-500 rounded-l-xl transition-all duration-700 ease-out flex items-center pl-3 text-xs text-black font-extrabold"
          style={{ width: `${teamAPct}%` }}
        >
          {teamAPct >= 20 && `${teamAName}`}
        </div>
        {/* Team B share */}
        <div
          className="h-full bg-zinc-800 transition-all duration-700 ease-out flex items-center justify-end pr-3 text-xs text-white"
          style={{ width: `${teamBPct}%` }}
        >
          {teamBPct >= 20 && `${teamBName}`}
        </div>
      </div>

      {trendText && (
        <div className="text-xs italic text-zinc-400 leading-relaxed pl-1">
          Trend: <span className="text-emerald-400/90 not-italic font-medium">{trendText}</span>
        </div>
      )}
    </div>
  );
};

export default WinProbability;
