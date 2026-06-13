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
        <div className="mt-8 rounded-2xl border border-lime-500/30 overflow-hidden bg-[#171717]">

            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-lime-500/20">
                <h2 className="text-3xl font-medium text-white">
                    Team Leaderboard
                </h2>

                <span className="text-lime-400 text-3xl font-mono font-semibold">
                    Top 4 Standings
                </span>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-6 px-8 py-5 bg-white/5 text-gray-300 font-mono text-xl">
                <div>Team</div>
                <div>Played</div>
                <div>Wins</div>
                <div>Losses</div>
                <div className="text-lime-400">Points</div>
                <div>NRR</div>
            </div>

            {/* Rows */}
            {teams.map((team) => (
                <div
                    key={team.id}
                    className="grid grid-cols-6 px-8 py-6 border-t border-lime-500/10 items-center hover:bg-white/[0.02] transition"
                >
                    <div className="flex items-center gap-4">
                        <div
                            className={`w-12 h-12 rounded-full border flex items-center justify-center font-semibold ${team.color}`}
                        >
                            {team.code}
                        </div>

                        <span className="text-white text-2xl">
                            {team.name}
                        </span>
                    </div>

                    <div className="text-white text-2xl">{team.played}</div>
                    <div className="text-white text-2xl">{team.wins}</div>
                    <div className="text-white text-2xl">{team.losses}</div>

                    <div className="text-lime-400 text-3xl font-bold">
                        {team.points}
                    </div>

                    <div
                        className={`text-2xl font-semibold ${team.nrr.startsWith("-")
                            ? "text-red-400"
                            : "text-green-400"
                            }`}
                    >
                        {team.nrr}
                    </div>
                </div>
            ))}
        </div>
    );
}