import GlassPanel from "./GlassPanel";
import FormatPill from './FormatPill'

function MiniMatchCard({ date, format, team1, team2 }) {
    return (
        <GlassPanel className="p-4 rounded-xl hover:border-[#94d5a5]/50 transition-all cursor-pointer">
            <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-[#8a938a] uppercase tracking-wider">
                    {date}
                </span>
                <FormatPill format={format} />
            </div>

            <div className="flex items-center justify-between mb-4">
                {[team1, team2].map((team, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded bg-[#282a2d] border border-white/5 mb-1 overflow-hidden flex items-center justify-center">
                            <span className="text-[9px] font-bold text-[#94d5a5]">{team}</span>
                        </div>
                        <span className="text-xs font-semibold">{team}</span>
                    </div>
                ))}
                <span className="text-[#8a938a] font-bold text-sm">V</span>
            </div>

            <button className="w-full py-1 text-[10px] font-bold border border-white/5 rounded hover:bg-white/5 transition-all text-[#c0c9bf]">
                REMIND ME
            </button>
        </GlassPanel>
    );
}

export default MiniMatchCard