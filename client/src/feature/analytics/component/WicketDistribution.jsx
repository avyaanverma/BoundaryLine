function WicketDistribution() {
    return (
        <div
            className="
                rounded-3xl
                border border-[#94d5a5]/10
                bg-gradient-to-br
                from-[#11161c]
                via-[#151b20]
                to-[#11161c]
                p-5
                md:p-8
            "
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">

                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">
                        Wickets Distribution
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Pace vs Spin Breakdown
                    </p>
                </div>

                <div
                    className="
                        px-3
                        py-1
                        rounded-full
                        bg-[#94d5a5]/10
                        text-[#94d5a5]
                        text-xs
                        font-medium
                    "
                >
                    Season 2024
                </div>

            </div>

            {/* Center Circle */}
            <div className="flex justify-center">

                <div
                    className="
                        relative
                        h-48
                        w-48
                        md:h-56
                        md:w-56
                        rounded-full
                        border-[14px]
                        border-[#94d5a5]/20
                        flex
                        flex-col
                        items-center
                        justify-center
                    "
                >
                    {/* Glow Ring */}
                    <div
                        className="
                            absolute
                            inset-0
                            rounded-full
                            shadow-[0_0_40px_rgba(148,213,165,0.08)]
                        "
                    />

                    <h3
                        className="
                            text-4xl
                            md:text-6xl
                            font-bold
                            text-[#94d5a5]
                        "
                    >
                        842
                    </h3>

                    <span
                        className="
                            mt-2
                            text-xs
                            uppercase
                            tracking-[0.25em]
                            text-gray-500
                        "
                    >
                        Total Wickets
                    </span>
                </div>

            </div>

            {/* Stats */}
            <div
                className="
                    mt-10
                    grid
                    grid-cols-2
                    gap-4
                "
            >
                <div
                    className="
                        rounded-2xl
                        border border-white/5
                        bg-white/[0.02]
                        p-4
                    "
                >
                    <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-[#94d5a5]" />

                        <span className="text-gray-300 font-medium">
                            Pace
                        </span>
                    </div>

                    <p className="mt-3 text-2xl font-bold text-[#94d5a5]">
                        58%
                    </p>
                </div>

                <div
                    className="
                        rounded-2xl
                        border border-white/5
                        bg-white/[0.02]
                        p-4
                    "
                >
                    <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-[#4b5b52]" />

                        <span className="text-gray-300 font-medium">
                            Spin
                        </span>
                    </div>

                    <p className="mt-3 text-2xl font-bold text-white">
                        42%
                    </p>
                </div>
            </div>
        </div>
    );
}

export default WicketDistribution;