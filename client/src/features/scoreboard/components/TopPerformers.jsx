import { Award, Sparkles } from "lucide-react";

export const TopPerformers = () => {
  return (
    <div className="p-5 rounded-2xl glass-card border border-white/5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold tracking-widest text-zinc-400 font-sans uppercase flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          Top Performers
        </h3>
      </div>
      <div className="flex flex-col gap-3">
        {/* MVP Batter */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-extrabold uppercase">
              IK
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Ishan Kishan</h4>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">
                74*(32) <span className="text-zinc-600">•</span> 231.25 SR
              </p>
            </div>
          </div>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider bg-amber-950/40 border border-amber-500/30 text-amber-400 uppercase">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            MVP
          </span>
        </div>

        {/* Top Bowler */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm font-extrabold uppercase">
              DC
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                Deepak Chahar
              </h4>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">
                3.2-0-28-2 <span className="text-zinc-600">•</span> 8.40 ER
              </p>
            </div>
          </div>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-zinc-800 text-zinc-400 border border-white/5 uppercase">
            BOWLER
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopPerformers;
