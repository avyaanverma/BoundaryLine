import {
    ArrowRight,
    TrendingUp,
    TrendingDown,
} from "lucide-react";
import { rankingsData } from "../hook/Rankingdata";

function RankingsTable({ activeTab }) {
    const teams =
        rankingsData[activeTab] || [];

    return (
        <div
            className="
                overflow-hidden
                rounded-2xl
                border border-[#94d5a5]/10
                bg-gradient-to-br
                from-[#11161c]
                via-[#151b20]
                to-[#11161c]
            "
        >
            {/* Header */}
            <div
                className="
                    grid
                    grid-cols-6
                    px-6
                    py-5
                    text-[11px]
                    uppercase
                    tracking-[0.15em]
                    text-gray-500
                    border-b border-[#94d5a5]/10
                "
            >
                <div>Rank</div>
                <div>Team</div>
                <div>Matches</div>
                <div>Points</div>
                <div>Rating</div>
                <div className="text-right">
                    Trend
                </div>
            </div>

            {/* Rows */}
            {teams.map((team, index) => (
                <div
                    key={team.rank}
                    className={`
                        grid
                        grid-cols-6
                        items-center
                        px-6
                        py-5
                        border-b
                        border-[#94d5a5]/5
                        transition-all
                        duration-300
                        hover:bg-[#94d5a5]/[0.03]
                        ${index === 0
                            ? "bg-[#0d2418]"
                            : ""
                        }
                    `}
                >
                    {/* Rank */}
                    <div>
                        {team.rank === 1 ? (
                            <div
                                className="
                                    h-10
                                    w-10
                                    rounded-full
                                    bg-[#94d5a5]
                                    flex
                                    items-center
                                    justify-center
                                    text-[#08110d]
                                    font-bold
                                    shadow-[0_0_20px_rgba(148,213,165,0.25)]
                                "
                            >
                                1
                            </div>
                        ) : (
                            <span className="text-2xl font-semibold text-gray-400">
                                {team.rank}
                            </span>
                        )}
                    </div>

                    {/* Team */}
                    <div className="flex items-center gap-3">
                        <div
                            className="
                                h-9
                                w-9
                                rounded-lg
                                border
                                border-[#94d5a5]/10
                                bg-[#0f1418]
                                flex
                                items-center
                                justify-center
                                text-lg
                            "
                        >
                            {team.flag}
                        </div>

                        <span
                            className={`
                                font-medium
                                text-base
                                ${team.rank === 1
                                    ? "text-[#94d5a5]"
                                    : "text-white"
                                }
                            `}
                        >
                            {team.name}
                        </span>
                    </div>

                    {/* Matches */}
                    <div className="text-gray-300">
                        {team.matches}
                    </div>

                    {/* Points */}
                    <div className="text-gray-300">
                        {team.points}
                    </div>

                    {/* Rating */}
                    <div
                        className={`
                            text-3xl
                            font-bold
                            ${team.rank === 1
                                ? "text-[#94d5a5]"
                                : "text-white"
                            }
                        `}
                    >
                        {team.rating}
                    </div>

                    {/* Trend */}
                    <div className="flex justify-end">
                        {team.trend ===
                            "stable" && (
                                <ArrowRight
                                    size={20}
                                    className="text-[#94d5a5]"
                                />
                            )}

                        {team.trend ===
                            "up" && (
                                <TrendingUp
                                    size={20}
                                    className="text-[#94d5a5]"
                                />
                            )}

                        {team.trend ===
                            "down" && (
                                <TrendingDown
                                    size={20}
                                    className="text-red-400"
                                />
                            )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RankingsTable;