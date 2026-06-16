function TournamentChart() {
    const bars = [45, 62, 30, 70, 95, 62, 45, 75];

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
                        Runs Scored Per Match
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Tournament scoring trend
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
                    +12.4%
                </div>
            </div>

            {/* Chart */}
            <div className="flex items-end justify-between h-56 md:h-72 gap-2">

                {bars.map((bar, index) => (
                    <div
                        key={index}
                        className="
                            flex-1
                            flex
                            items-end
                        "
                    >
                        <div
                            className={`
                                w-full
                                rounded-t-xl
                                transition-all
                                duration-300
                                hover:opacity-90
                                ${index === 4
                                    ? "bg-[#94d5a5] shadow-[0_0_20px_rgba(148,213,165,0.25)]"
                                    : "bg-[#94d5a5]/30"
                                }
                            `}
                            style={{
                                height: `${bar}%`,
                            }}
                        />
                    </div>
                ))}

            </div>

            {/* Footer Labels */}
            <div
                className="
                    flex
                    justify-between
                    mt-6
                    text-xs
                    md:text-sm
                    tracking-wider
                    uppercase
                    text-gray-500
                "
            >
                <span>Match 1</span>
                <span>Match 74</span>
                <span>Latest</span>
            </div>
        </div>
    );
}

export default TournamentChart;