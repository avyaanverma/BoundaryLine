import { useSelector } from "react-redux";
import { Sparkles, MessageSquare, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const LiveCommentary = () => {
  const currentMatch = useSelector((state) => state.match.currentMatch);
  // Helper styles for commentary categories
  const getCategoryTheme = (type) => {
    switch (type) {
      case "WICKET":
        return {
          icon: <X className="w-3.5 h-3.5 text-rose-500" />,
          dotBg: "bg-rose-950/40 border-rose-500/50",
          tag: "bg-rose-950/40 text-rose-400 border-rose-500/20",
          label: "WICKET",
        };
      case "BOUNDARY":
        return {
          icon: <Plus className="w-3.5 h-3.5 text-lime-400" />,
          dotBg: "bg-lime-950/40 border-lime-500/50",
          tag: "bg-lime-950/40 text-lime-400 border-lime-500/20",
          label: "BOUNDARY",
        };
      case "EXTRA":
        return {
          icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
          dotBg: "bg-amber-950/40 border-amber-500/50",
          tag: "bg-amber-950/40 text-amber-400 border-amber-500/20",
          label: "EXTRA",
        };
      default:
        return {
          icon: <div className="h-2 w-2 rounded-full bg-zinc-500"></div>,
          dotBg: "bg-zinc-800 border-zinc-700",
          tag: "bg-zinc-900 text-zinc-400 border-white/5",
          label: "BALL",
        };
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          Live Commentary
        </h3>
        <span className="text-xs text-zinc-500 font-mono">Showing Latest Over</span>
      </div>

      <div className="relative border-l border-zinc-800 pl-6 ml-3 flex flex-col gap-6 font-sans">
        <AnimatePresence initial={false}>
          {currentMatch.commentary.map((item) => {
            const theme = getCategoryTheme(item.type);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col gap-2 p-4 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-colors duration-200"
              >
                {/* Timeline node */}
                <div
                  className={`absolute -left-[37px] top-6 w-7 h-7 rounded-full border flex items-center justify-center glow-sm ${theme.dotBg}`}
                >
                  {theme.icon}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded-md">
                      Over {item.over}
                    </span>
                    <h4 className="text-sm font-bold text-white leading-none">
                      {item.title}
                    </h4>
                  </div>
                  <span
                    className={`text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full border uppercase ${theme.tag}`}
                  >
                    {theme.label}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-sans pr-1">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveCommentary;
