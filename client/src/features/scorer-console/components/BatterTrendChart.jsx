import { BarChart3 } from "lucide-react";

export const BatterTrendChart = () => {
  // Hardcoded values matching the mock visual columns in Batter SR Trend (Image 1)
  const data = [
    { label: "Over 1", sr: 110, active: false },
    { label: "Over 6", sr: 125, active: false },
    { label: "Over 12", sr: 140, active: false },
    { label: "Over 15", sr: 115, active: false },
    { label: "Over 16", sr: 160, active: false },
    { label: "Over 17", sr: 152, active: false },
    { label: "Last Over", sr: 200, active: true },
  ];

  const maxSR = 220;

  return (
    <div className="p-5 rounded-2xl bg-zinc-900 border border-white/5 flex flex-col gap-4">
      <h3 className="text-xs font-bold tracking-widest text-zinc-400 font-sans uppercase flex items-center gap-1.5">
        <BarChart3 className="w-4 h-4 text-emerald-400" />
        Batter SR Trend
      </h3>

      {/* SVG Bar chart */}
      <div className="h-44 w-full flex items-end justify-between gap-2.5 pt-4 px-1 pb-1 relative">
        {data.map((item, idx) => {
          const heightPercent = (item.sr / maxSR) * 100;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
              {/* Tooltip on hover */}
              <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-zinc-950 text-white text-[10px] py-1 px-2 rounded -translate-y-12 shadow-md border border-white/5 font-mono">
                {item.sr}% SR
              </div>

              {/* Column Bar */}
              <div
                className={`w-full rounded-md transition-all duration-300 ${
                  item.active
                    ? "bg-gradient-to-t from-emerald-600 to-emerald-400/95"
                    : "bg-emerald-950/40 border border-emerald-500/10 hover:bg-emerald-900/45"
                }`}
                style={{ height: `${heightPercent}%` }}
              ></div>
            </div>
          );
        })}
      </div>

      {/* X-Axis labels */}
      <div className="flex justify-between items-center text-[10px] font-semibold text-zinc-500 font-sans px-1">
        <span>Over 1</span>
        <span>Last Over</span>
      </div>
    </div>
  );
};
export default BatterTrendChart;
