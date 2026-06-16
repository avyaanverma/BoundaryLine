import GlassPanel from "./GlassPanel";
import StatusBadge from "./StatusBadge";



const FORMAT_BORDER = {
    t20: "border-l-4 border-l-[#94d5a5]",
    odi: "border-l-4 border-l-[#97d940]",
    test: "border-l-4 border-l-[#ff4d4d]",
};

function MatchCardFull({ format, seriesName, subtitle, status, team1, team2, footer }) {
    return (
        <GlassPanel
            className={`rounded-2xl overflow-hidden ${FORMAT_BORDER[format]} group hover:shadow-2xl hover:shadow-[#94d5a5]/10 transition-all duration-300`}
        >
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col">
                        <span
                            className={`text-xs font-semibold uppercase ${format === "test"
                                ? "text-[#ff4d4d]"
                                : format === "odi"
                                    ? "text-[#97d940]"
                                    : "text-[#94d5a5]"
                                }`}
                        >
                            {seriesName}
                        </span>
                        <span className="text-[#c0c9bf] text-sm">{subtitle}</span>
                    </div>
                    <StatusBadge status={status} />
                </div>

                {/* Teams */}
                <div className="space-y-4 mb-6">
                    {[team1, team2].map((team, i) => (
                        <div
                            key={i}
                            className={`flex items-center justify-between ${i === 1 ? "opacity-80" : ""
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#282a2d] flex items-center justify-center border border-white/10 overflow-hidden">
                                    {team.flagBg ? (
                                        <div
                                            className="w-6 h-4 rounded text-[8px] font-bold flex items-center justify-center"
                                            style={{ background: team.flagBg, color: team.flagText || "#fff" }}
                                        >
                                            {team.code}
                                        </div>
                                    ) : (
                                        <span className="text-xs font-bold text-[#94d5a5]">{team.code}</span>
                                    )}
                                </div>
                                <span className="text-2xl font-semibold">{team.name}</span>
                            </div>
                            <span
                                className={`text-[40px] font-bold leading-none tracking-tight ${team.scoreStyle === "primary"
                                    ? "text-[#94d5a5]"
                                    : team.scoreStyle === "muted"
                                        ? "text-[#c0c9bf] italic"
                                        : "text-[#e2e2e6]"
                                    }`}
                            >
                                {team.score}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    {footer}
                </div>
            </div>
        </GlassPanel>
    );
}

export default MatchCardFull