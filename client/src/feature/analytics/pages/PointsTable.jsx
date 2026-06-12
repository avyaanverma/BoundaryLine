

function PointsTable() {
    const teams = [
        {
            pos: 1,
            team: "Mumbai Indians",
            matches: 8,
            wins: 6,
            losses: 2,
            points: 12,
            nrr: "+1.24",
        },
        {
            pos: 2,
            team: "CSK",
            matches: 8,
            wins: 5,
            losses: 3,
            points: 10,
            nrr: "+0.98",
        },
        {
            pos: 3,
            team: "RCB",
            matches: 8,
            wins: 5,
            losses: 3,
            points: 10,
            nrr: "+0.72",
        },
        {
            pos: 4,
            team: "KKR",
            matches: 8,
            wins: 4,
            losses: 4,
            points: 8,
            nrr: "+0.10",
        },
    ];

    return (
        <div className="space-y-6">

            {/* Points Table */}
            <div className="bg-[#191b1e] border border-gray-800 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                    Points Table
                </h2>

                <div className="overflow-x-auto px-2.5">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-700 text-gray-400">
                                <th className="text-left py-3">Pos</th>
                                <th className="text-left py-3">Team</th>
                                <th className="text-center py-3">M</th>
                                <th className="text-center py-3">W</th>
                                <th className="text-center py-3">L</th>
                                <th className="text-center py-3">Pts</th>
                                <th className="text-center py-3">NRR</th>
                            </tr>
                        </thead>

                        <tbody>
                            {teams.map((team) => (
                                <tr
                                    key={team.pos}
                                    className={`border-b  border-gray-800 hover:bg-gray-800/40 transition ${team.pos <= 4
                                        ? "bg-green-500/5"
                                        : ""
                                        }`}
                                >
                                    <td className="py-4 px-2 text-white">
                                        {team.pos}
                                    </td>

                                    <td className="py-4 text-white font-medium">
                                        {team.team}
                                    </td>

                                    <td className="py-4 text-center text-gray-300">
                                        {team.matches}
                                    </td>

                                    <td className="py-4 text-center text-green-400">
                                        {team.wins}
                                    </td>

                                    <td className="py-4 text-center text-red-400">
                                        {team.losses}
                                    </td>

                                    <td className="py-4 text-center text-yellow-400 font-semibold">
                                        {team.points}
                                    </td>

                                    <td className="py-4 text-center text-cyan-400">
                                        {team.nrr}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
}

export default PointsTable;

