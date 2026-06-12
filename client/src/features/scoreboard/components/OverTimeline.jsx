export const OverTimeline = ({
  balls,
  maxDisplay = 7,
  label = "THIS OVER",
}) => {
  const renderedBalls = balls.slice(-maxDisplay);
  // Helper to color-code cricket ball results exactly matching professional scorecards
  const getBallStyles = (ball) => {
    const b = ball.toUpperCase();
    if (b === "W" || b.startsWith("WIC")) {
      return "bg-rose-950/90 text-red-400 border border-red-500/30 font-bold shadow-lg shadow-rose-950/20";
    }
    if (b === "6") {
      return "bg-lime-600 text-black font-extrabold shadow-sm shadow-lime-500/20";
    }
    if (b === "4") {
      return "bg-emerald-800 text-white font-bold shadow-sm shadow-emerald-500/20";
    }
    if (b.includes("WD")) {
      return "bg-amber-600 text-black font-semibold";
    }
    if (b.includes("NB")) {
      return "bg-cyan-900/90 text-cyan-300 border border-cyan-400/30 font-semibold";
    }
    if (b === "0" || b === "." || b === "●" || b === "DOT") {
      return "bg-zinc-800 text-zinc-400";
    }
    // Any other runs like 1, 2, 3
    return "bg-zinc-700 text-white font-medium";
  };

  return (
    <div className="flex items-center gap-3">
      {label && (
        <span className="text-xs font-bold tracking-widest text-zinc-500 font-sans uppercase shrink-0">
          {label}
        </span>
      )}
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
        {renderedBalls.map((ball, idx) => (
          <div
            key={`${ball}-${idx}`}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono transition-transform duration-300 transform scale-100 hover:scale-105 shrink-0 ${getBallStyles(
              ball,
            )}`}
          >
            {ball}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverTimeline;
