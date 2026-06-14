import {
    TrendingUp,
    TrendingDown,
    Minus
} from "lucide-react";

function TeamCard({ team }) {
    return (
        <div
            className="
            relative
            bg-[#1e2023]
            rounded-xl
            p-6
            border
            border-[#2A2F3A]
            overflow-hidden
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-[#3A404D]
            "
        >
            {/* Left Accent */}
            <div
                className="absolute left-0 top-0 h-full w-[3px]"
                style={{
                    backgroundColor: team.borderColor,
                }}
            />

            {/* Header */}
            <div className="flex justify-between items-start">
                <img
                    src={team.flag}
                    alt={team.name}
                    className="w-14 h-10 rounded object-cover"
                />

                <div className="text-right">
                    <p
                        className="text-xs font-bold tracking-widest uppercase"
                        style={{
                            color: team.borderColor,
                        }}
                    >
                        Ranked #{team.rank}
                    </p>

                    {/* Rank Movement */}
                    <div className="flex items-center justify-center gap-1 mt-1">

                        {team.rankChange > 0 && (
                            <>
                                <TrendingUp
                                    size={14}
                                    className="text-green-400"
                                />

                            </>
                        )}

                        {team.rankChange < 0 && (
                            <>
                                <TrendingDown
                                    size={14}
                                    className="text-red-400"
                                />

                            </>
                        )}

                        {team.rankChange === 0 && (
                            <>
                                <Minus
                                    size={14}
                                    className="text-gray-400"
                                />
                                <span className="text-xs text-gray-400 font-semibold">
                                    0
                                </span>
                            </>
                        )}

                        <p
                            className="text-md font-semibold mt-1"
                            style={{
                                color: team.borderColor,
                            }}
                        >
                            {team.points} Points
                        </p>
                    </div>

                </div>
            </div>

            {/* Team Info */}
            <div className="mt-5">
                <h2 className="text-[38px] font-bold leading-none text-white">
                    {team.name}
                </h2>

                <p className="mt-2 text-gray-400 text-base">
                    {team.board} • {team.region}
                </p>
            </div>

            {/* Captain */}
            <div
                className="
                mt-6
                bg-[#292b2e]
                rounded-md
                px-4
                py-3
                flex
                items-center
                gap-3
                "
            >
                <img
                    src={team.captainImage}
                    alt={team.captain}
                    className="
                    w-12
                    h-12
                    rounded-full
                    object-cover
                    border
                    border-[#3A404D]
                    "
                />

                <div>
                    <p className="text-xs text-gray-400">
                        Captain
                    </p>

                    <h4 className="text-lg font-semibold text-white">
                        {team.captain}
                    </h4>
                </div>
            </div>

            {/* Button */}
            <button
                className="
                w-full
                mt-5
                h-11
                rounded-lg
                border
                border-[#31403A]
                text-[#9DD7B0]
                text-sm
                font-semibold
                tracking-wide
                hover:bg-[#1F2A24]
                transition-all
                "
            >
                VIEW FULL ROSTER
            </button>
        </div>
    );
}

export default TeamCard;