const teams = [
    {
        id: 1,
        code: "MS",
        name: "Mumbai Strikers",
        played: 14,
        wins: 11,
        losses: 3,
        points: 22,
        nrr: "+1.242",
        color: "border-blue-500 text-blue-400",
    },
    {
        id: 2,
        code: "DT",
        name: "Delhi Titans",
        played: 14,
        wins: 10,
        losses: 4,
        points: 20,
        nrr: "+0.891",
        color: "border-red-500 text-red-400",
    },
    {
        id: 3,
        code: "BR",
        name: "Bangalore Royals",
        played: 14,
        wins: 9,
        losses: 5,
        points: 18,
        nrr: "-0.124",
        color: "border-yellow-500 text-yellow-400",
    },
    {
        id: 4,
        code: "CK",
        name: "Chennai Kings",
        played: 14,
        wins: 8,
        losses: 6,
        points: 16,
        nrr: "+0.420",
        color: "border-yellow-600 text-yellow-500",
    },
];

export default function TeamLeaderboard() {
    return (
        <section
            className="
                mt-10
                overflow-hidden
                rounded-3xl
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
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-3
                    px-5
                    md:px-8
                    py-5
                    border-b
                    border-white/10
                "
            >
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Team Leaderboard
                </h2>

                <span
                    className="
                        text-[#94d5a5]
                        text-sm
                        md:text-base
                        font-medium
                    "
                >
                    Top 4 Standings
                </span>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block">

                <div
                    className="
                        grid
                        grid-cols-6
                        px-8
                        py-4
                        text-xs
                        uppercase
                        tracking-wider
                        text-gray-500
                        border-b
                        border-white/5
                    "
                >
                    <div>Team</div>
                    <div>Played</div>
                    <div>Wins</div>
                    <div>Losses</div>
                    <div className="text-[#94d5a5]">
                        Points
                    </div>
                    <div>NRR</div>
                </div>

                {teams.map((team, index) => (
                    <div
                        key={team.id}
                        className={`
                            grid
                            grid-cols-6
                            items-center
                            px-8
                            py-5
                            border-b
                            border-white/5
                            hover:bg-white/[0.02]
                            transition-all
                            ${index === 0 ? "bg-[#052312]/40" : ""}
                        `}
                    >
                        <div className="flex items-center gap-4">

                            <div
                                className={`
                                    h-11
                                    w-11
                                    rounded-full
                                    border
                                    flex
                                    items-center
                                    justify-center
                                    font-semibold
                                    ${team.color}
                                `}
                            >
                                {team.code}
                            </div>

                            <span className="text-white font-medium">
                                {team.name}
                            </span>

                        </div>

                        <div className="text-gray-300">
                            {team.played}
                        </div>

                        <div className="text-gray-300">
                            {team.wins}
                        </div>

                        <div className="text-gray-300">
                            {team.losses}
                        </div>

                        <div className="text-[#94d5a5] font-bold text-xl">
                            {team.points}
                        </div>

                        <div
                            className={`font-semibold ${team.nrr.startsWith("-")
                                ? "text-red-400"
                                : "text-[#94d5a5]"
                                }`}
                        >
                            {team.nrr}
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden p-4 space-y-4">
                {teams.map((team) => (
                    <div
                        key={team.id}
                        className="
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/[0.02]
                            p-4
                        "
                    >
                        <div className="flex items-center gap-3 mb-4">

                            <div
                                className={`
                                    h-10
                                    w-10
                                    rounded-full
                                    border
                                    flex
                                    items-center
                                    justify-center
                                    font-semibold
                                    ${team.color}
                                `}
                            >
                                {team.code}
                            </div>

                            <div>
                                <h3 className="text-white font-medium">
                                    {team.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Rank #{team.id}
                                </p>
                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">

                            <div>
                                <p className="text-gray-500">Played</p>
                                <p className="text-white">{team.played}</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Wins</p>
                                <p className="text-white">{team.wins}</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Points</p>
                                <p className="text-[#94d5a5] font-bold">
                                    {team.points}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">NRR</p>
                                <p
                                    className={`font-semibold ${team.nrr.startsWith("-")
                                        ? "text-red-400"
                                        : "text-[#94d5a5]"
                                        }`}
                                >
                                    {team.nrr}
                                </p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}