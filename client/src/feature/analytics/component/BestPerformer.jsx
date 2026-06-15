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
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Tournament MVPs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {mvps.map((player) => (
                    <div
                        key={player.id}
                        className="
                            overflow-hidden
                            rounded-3xl
                            border border-[#94d5a5]/10
                            bg-gradient-to-br
                            from-[#11161c]
                            via-[#151b20]
                            to-[#11161c]
                            hover:border-[#94d5a5]/25
                            hover:-translate-y-1
                            transition-all
                            duration-300
                        "
                    >
                        {/* Image */}
                        <div className="relative h-56 overflow-hidden">

                            <img
                                src={player.image}
                                alt={player.name}
                                className="
                                    w-full
                                    h-full
                                    object-cover
                                    transition-transform
                                    duration-500
                                    hover:scale-105
                                "
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#11161c] via-transparent to-transparent" />

                            <div className="absolute bottom-4 left-4">
                                <span
                                    className="
                                        px-4
                                        py-2
                                        rounded-full
                                        bg-[#94d5a5]
                                        text-[#08110b]
                                        text-xs
                                        md:text-sm
                                        font-bold
                                        uppercase
                                        tracking-wide
                                    "
                                >
                                    {player.title}
                                </span>
                            </div>

                        </div>

                        {/* Content */}
                        <div className="p-6">

                            <h3 className="text-2xl md:text-3xl font-bold text-white">
                                {player.name}
                            </h3>

                            <p className="mt-2 text-gray-400">
                                {player.team}
                            </p>

                            <div className="mt-8 flex items-end justify-between">

                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-500">
                                        {player.statLabel1}
                                    </p>

                                    <p className="mt-2 text-4xl md:text-5xl font-bold text-[#94d5a5]">
                                        {player.statValue1}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs uppercase tracking-wider text-gray-500">
                                        {player.statLabel2}
                                    </p>

                                    <p className="mt-2 text-2xl md:text-3xl font-bold text-white">
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