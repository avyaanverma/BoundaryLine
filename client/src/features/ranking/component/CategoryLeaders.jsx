const leaders = [
    {
        id: 1,
        name: "Babar Azam",
        category: "Top Batter",
        rating: 824,
        peak: 912,
        flag: "🇵🇰",
        image:
            "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200",
    },
    {
        id: 2,
        name: "Rashid Khan",
        category: "Top Bowler",
        rating: 798,
        peak: 840,
        flag: "🇦🇫",
        image:
            "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200",
    },
    {
        id: 3,
        name: "Ravindra Jadeja",
        category: "Top All-Rounder",
        rating: 455,
        peak: 499,
        flag: "🇮🇳",
        image:
            "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=1200",
    },
];

function CategoryLeaders() {
    return (
        <section className="mt-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Category Leaders
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {leaders.map((player) => (
                    <div
                        key={player.id}
                        className="
                            group
                            overflow-hidden
                            rounded-2xl
                            border border-[#94d5a5]/10
                            bg-gradient-to-br
                            from-[#11161c]
                            via-[#151b20]
                            to-[#11161c]
                            hover:border-[#94d5a5]/30
                            hover:-translate-y-1
                            hover:shadow-[0_10px_30px_rgba(148,213,165,0.08)]
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
                                    group-hover:scale-105
                                "
                            />

                            {/* Overlay */}
                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-[#11161c]
                                    via-[#11161c]/20
                                    to-transparent
                                "
                            />

                            {/* Rank Badge */}
                            <div
                                className="
                                    absolute
                                    top-4
                                    right-4
                                    h-11
                                    w-11
                                    rounded-full
                                    bg-[#94d5a5]
                                    text-[#08110d]
                                    flex
                                    items-center
                                    justify-center
                                    font-bold
                                    text-lg
                                    shadow-[0_0_20px_rgba(148,213,165,0.35)]
                                "
                            >
                                1
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">

                            <div className="flex items-start justify-between">

                                <div>
                                    <h3 className="text-2xl lg:text-3xl font-bold text-[#f5f7f8]">
                                        {player.name}
                                    </h3>

                                    <p
                                        className="
                                            mt-2
                                            text-xs
                                            uppercase
                                            tracking-[0.2em]
                                            text-[#94d5a5]/80
                                        "
                                    >
                                        {player.category}
                                    </p>
                                </div>

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
                                    {player.flag}
                                </div>

                            </div>

                            {/* Divider */}
                            <div className="my-5 border-t border-[#94d5a5]/10" />

                            {/* Stats */}
                            <div className="flex items-center justify-between">

                                <div>
                                    <p
                                        className="
                                            text-[11px]
                                            uppercase
                                            tracking-widest
                                            text-gray-500
                                        "
                                    >
                                        Rating
                                    </p>

                                    <h4
                                        className="
                                            mt-2
                                            text-4xl
                                            font-bold
                                            text-[#94d5a5]
                                        "
                                    >
                                        {player.rating}
                                    </h4>
                                </div>

                                <div className="text-right">

                                    <p
                                        className="
                                            text-[11px]
                                            uppercase
                                            tracking-widest
                                            text-gray-500
                                        "
                                    >
                                        Peak
                                    </p>

                                    <h4
                                        className="
                                            mt-2
                                            text-4xl
                                            font-bold
                                            text-[#e7ecef]
                                        "
                                    >
                                        {player.peak}
                                    </h4>

                                </div>

                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
}

export default CategoryLeaders;