import { Newspaper, ChevronRight } from "lucide-react";
export const MatchNews = () => {
  return (
    <div className="p-5 rounded-2xl glass-card border border-white/5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold tracking-widest text-zinc-400 font-sans uppercase flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-cyan-400" />
          Match News
        </h3>
        <button className="text-xs text-emerald-400 font-semibold flex items-center transition-colors duration-150">
          View All
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Main News Card */}
        <div className="rounded-xl overflow-hidden bg-zinc-900/60 border border-white/5 hover:border-white/10 transition-all duration-200 group">
          {/* Visual card placeholder */}
          <div className="h-40 w-full bg-gradient-to-br from-zinc-850 via-zinc-900 to-emerald-950/45 relative flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-200"></div>
            {/* Minimalist stadium artwork silhouette */}
            <div className="relative text-center z-10">
              <span className="text-[10px] font-bold tracking-widest bg-emerald-950/90 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-md uppercase">
                Stadium Cam • live
              </span>
            </div>
          </div>

          <div className="p-4">
            <h4 className="text-xs font-semibold text-zinc-400 mb-1.5 uppercase font-sans tracking-wide">
              Wankhede Stadium
            </h4>
            <h5 className="text-sm font-bold text-white leading-snug group-hover:text-emerald-400 transition-colors duration-200">
              Wankhede Stadium erupts as Mumbai Indians close in on a record chase
            </h5>
            <div className="flex items-center gap-2 mt-3 text-[11px] text-zinc-500 font-sans">
              <span className="text-red-500 font-extrabold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping"></span>
                Breaking
              </span>
              <span>•</span>
              <span>2 mins ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchNews;
