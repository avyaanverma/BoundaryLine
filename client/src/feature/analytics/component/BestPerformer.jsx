const mvps = [
    {
        id: 1,
        title: "Top Batsman",
        name: "Virat Kohli",
        team: "Delhi Titans",
        statLabel1: "RUNS",
        statValue1: "642",
        statLabel2: "AVG",
        statValue2: "71.3",
        image:
            "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200",
    },
    {
        id: 2,
        title: "Top Bowler",
        name: "Jasprit Bumrah",
        team: "Mumbai Strikers",
        statLabel1: "WICKETS",
        statValue1: "24",
        statLabel2: "ECON",
        statValue2: "6.12",
        image:
            "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=1200",
    },
    {
        id: 3,
        title: "Top All-Rounder",
        name: "Hardik Pandya",
        team: "Mumbai Strikers",
        statLabel1: "R / W",
        statValue1: "380 / 12",
        statLabel2: "SR",
        statValue2: "158.5",
        image:
            "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200",
    },
];

export default function TournamentMVPs() {
    return (
        <section className="mt-10">
            <h2 className="text-3xl font-semibold text-white mb-6">
                Tournament MVPs
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {mvps.map((player) => (
                    <div
                        key={player.id}
                        className="bg-[#171717] border border-lime-500/20 rounded-2xl overflow-hidden"
                    >
                        <div className="relative h-60">
                            <img
                                src={player.image}
                                alt={player.name}
                                className="w-full h-full object-cover"
                            />

                            <div className="absolute bottom-4 left-4">
                                <span className="bg-lime-400 text-black px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                                    {player.title}
                                </span>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-3xl text-white font-medium">
                                {player.name}
                            </h3>

                            <p className="text-gray-400 mt-2 text-xl">
                                {player.team}
                            </p>

                            <div className="flex justify-between mt-8">
                                <div>
                                    <p className="text-gray-500 text-sm uppercase">
                                        {player.statLabel1}
                                    </p>

                                    <p className="text-lime-400 text-5xl font-bold mt-2">
                                        {player.statValue1}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-gray-500 text-sm uppercase">
                                        {player.statLabel2}
                                    </p>

                                    <p className="text-white text-3xl font-semibold mt-2">
                                        {player.statValue2}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}