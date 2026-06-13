import { standings } from "../hook/standingsData";
import RecentForm from "./RecentForm";

function StandingsTable() {
    return (
        <div className="bg-[#1e2020] border border-lime-500/20 rounded-3xl overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-lime-500/10">
                <h2 className="text-2xl font-semibold text-white">
                    Tournament Standings
                </h2>

                <div className="flex items-center gap-6 text-sm">
                    <span className="text-lime-400">
                        ● Qualification
                    </span>

                    <span className="text-red-500">
                        ● Elimination
                    </span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">

                    {/* Table Header */}
                    <thead className="bg-white/5">
                        <tr className="text-gray-300 uppercase tracking-wider text-sm">
                            <th className="text-left px-8 py-5">POS</th>
                            <th className="text-left px-8 py-5">TEAM</th>
                            <th className="text-center px-4 py-5">P</th>
                            <th className="text-center px-4 py-5">W</th>
                            <th className="text-center px-4 py-5">L</th>
                            <th className="text-center px-4 py-5">PTS</th>
                            <th className="text-center px-4 py-5">NRR</th>
                            <th className="text-center px-8 py-5">
                                RECENT FORM
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {standings.map((team, index) => (
                            <tr
                                key={team.pos}
                                className="border-t border-lime-500/10 hover:bg-white/[0.02] transition-all"
                            >
                                {/* Position */}
                                <td className="px-8 py-8">
                                    <div className="flex items-center gap-4">
                                        {(index < 4) && (
                                            <div className="w-1 h-16 bg-lime-400 rounded-full" />
                                        )}

                                        <span className="text-2xl font-bold text-lime-400">
                                            {String(team.pos).padStart(2, "0")}
                                        </span>
                                    </div>
                                </td>

                                {/* Team */}
                                <td className="px-8 py-8">
                                    <div className="flex items-center gap-4">

                                        <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-bold">
                                            {team.team
                                                .split(" ")
                                                .map(word => word[0])
                                                .join("")
                                                .slice(0, 2)}
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-semibold text-white">
                                                {team.team}
                                            </h3>

                                            <p
                                                className={`text-sm uppercase font-medium mt-1 ${team.status === "Qualified"
                                                    ? "text-lime-400"
                                                    : team.status === "Eliminated"
                                                        ? "text-red-500"
                                                        : "text-yellow-400"
                                                    }`}
                                            >
                                                {team.status}
                                            </p>
                                        </div>

                                    </div>
                                </td>

                                {/* Stats */}
                                <td className="text-center text-xl">
                                    {team.played}
                                </td>

                                <td className="text-center text-xl">
                                    {team.won}
                                </td>

                                <td className="text-center text-xl">
                                    {team.lost}
                                </td>

                                <td className="text-center text-2xl font-bold text-lime-400">
                                    {team.points}
                                </td>

                                <td
                                    className={`text-center text-xl font-semibold ${team.nrr.startsWith("-")
                                        ? "text-red-400"
                                        : "text-lime-400"
                                        }`}
                                >
                                    {team.nrr}
                                </td>

                                {/* Recent Form */}
                                <td className="px-8">
                                    <RecentForm form={team.recentForm} />
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default StandingsTable;