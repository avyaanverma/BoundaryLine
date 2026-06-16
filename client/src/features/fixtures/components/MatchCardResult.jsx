import { Share2 } from "lucide-react";
import GlassPanel from './GlassPanel'
import FORMAT_BORDER from "./FormateBorder";
import StatusBadge from "./StatusBadge";


function MatchCardResult({ seriesName, subtitle, team1, team2, resultText }) {
    return (
        <GlassPanel
            className={`rounded-2xl overflow-hidden ${FORMAT_BORDER.test} group opacity-90 hover:opacity-100 transition-all duration-300`}
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold uppercase text-[#ff4d4d]">
                            {seriesName}
                        </span>
                        <span className="text-[#c0c9bf] text-sm">{subtitle}</span>
                    </div>
                    <StatusBadge status="RESULT" />
                </div>

                <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between">
                        <span className="text-base">{team1.name}</span>
                        <span className="text-2xl font-semibold text-[#c0c9bf]">{team1.score}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-[#94d5a5]">{team2.name}</span>
                        <span className="text-2xl font-semibold text-[#94d5a5]">{team2.score}</span>
                    </div>
                </div>

                <div className="py-2 px-4 bg-[#004a26]/20 rounded-lg text-[#94d5a5] text-xs font-bold text-center mb-4">
                    {resultText}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <button className="text-[#c0c9bf] text-xs font-semibold hover:text-[#e2e2e6] transition-colors">
                        Highlights
                    </button>
                    <button className="text-[#c0c9bf] hover:text-[#94d5a5] transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </GlassPanel>
    );
}


export default MatchCardResult