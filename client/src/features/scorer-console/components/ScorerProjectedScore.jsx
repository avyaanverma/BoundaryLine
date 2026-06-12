import { useSelector } from "react-redux";
import { CalendarRange } from "lucide-react";

export const ScorerProjectedScore = () => {
  const match = useSelector((state) => state.match.currentMatch);
  const activeInnings = match.innings[match.currentInningsNum - 1];

  const totalOvers = 20; // T20
  const oversBowled = activeInnings.overs + activeInnings.balls / 6;
  const currentRuns = activeInnings.runs;

  const crr = oversBowled > 0 ? currentRuns / oversBowled : 0;
  // Projected score calculations
  const projectedAtCurrent = Math.round(currentRuns + crr * (totalOvers - oversBowled));
  const projectedAtTwelve = Math.round(currentRuns + 12 * (totalOvers - oversBowled));

  return (
    <div className="p-5 rounded-2xl bg-zinc-900 border border-white/5 flex flex-col gap-4">
      <h3 className="text-xs font-bold tracking-widest text-zinc-400 font-sans uppercase flex items-center gap-1.5">
        <CalendarRange className="w-4 h-4 text-emerald-400" />
        Projected Score
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {/* At current rate */}
        <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/5 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider leading-none">
            At Current ({crr.toFixed(1)})
          </span>
          <span className="text-2xl font-black text-white font-mono mt-1">
            {projectedAtCurrent}
          </span>
        </div>

        {/* At 12 RPO */}
        <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/5 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider leading-none text-emerald-400/90">
            At 12 RPO
          </span>
          <span className="text-2xl font-black text-emerald-400 font-mono mt-1">
            {projectedAtTwelve}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScorerProjectedScore;
