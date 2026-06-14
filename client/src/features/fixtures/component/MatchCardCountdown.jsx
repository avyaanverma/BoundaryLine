import { Bell, Info } from "lucide-react";
import { useEffect, useState } from "react";
import GlassPanel from '../component/GlassPanel'
import FORMAT_BORDER from '../component/FormateBorder'
import StatusBadge from '../component/StatusBadge'

function MatchCardCountdown({ seriesName, subtitle, team1, team2, countdown }) {
    const [time, setTime] = useState(countdown);

    useEffect(() => {
        const id = setInterval(() => {
            setTime((prev) => {
                let [h, m, s] = prev.split(":").map(Number);
                s--;
                if (s < 0) { s = 59; m--; }
                if (m < 0) { m = 59; h--; }
                if (h < 0) return "00:00:00";
                return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
            });
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <GlassPanel
            className={`rounded-2xl overflow-hidden ${FORMAT_BORDER.odi} group hover:shadow-2xl hover:shadow-[#97d940]/10 transition-all duration-300`}
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold uppercase text-[#97d940]">
                            {seriesName}
                        </span>
                        <span className="text-[#c0c9bf] text-sm">{subtitle}</span>
                    </div>
                    <StatusBadge status="UPCOMING" />
                </div>

                {/* VS layout */}
                <div className="flex items-center justify-around py-4 mb-4">
                    {[team1, team2].map((team, i) => (
                        <div key={i} className="text-center">
                            <div className="w-16 h-16 rounded-full bg-[#282a2d] flex items-center justify-center border border-white/10 mb-2 mx-auto shadow-inner">
                                <span className="text-sm font-bold text-[#94d5a5]">{team.code}</span>
                            </div>
                            <span className="text-xs font-semibold">{team.name}</span>
                        </div>
                    ))}
                </div>

                {/* Countdown overlaid between teams — re-create the original centred VS block */}
                <div className="flex items-center justify-center -mt-16 mb-4 pointer-events-none">
                    <div className="text-center px-6">
                        <div className="text-[#97d940] text-[40px] font-bold leading-none mb-1">VS</div>
                        <div className="text-[10px] text-[#8a938a] uppercase font-bold tracking-tighter">
                            {time}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <button className="flex items-center justify-center gap-1 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-all text-xs font-bold">
                        <Bell className="w-4 h-4" /> ADD REMINDER
                    </button>
                    <button className="flex items-center justify-center gap-1 py-2 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-xs font-bold">
                        <Info className="w-4 h-4" /> PREVIEW
                    </button>
                </div>
            </div>
        </GlassPanel>
    );
};

export default MatchCardCountdown