function RankingsHero() {
    return (
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1118] px-6 py-10 md:px-10 md:py-14">

            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(148,213,165,0.15),transparent_40%)]" />

            {/* Live Badge */}
            <div className="relative z-10">
                <span
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-[#94d5a5]/20
                        bg-[#94d5a5]/10
                        px-4
                        py-1.5
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wider
                        text-[#94d5a5]
                    "
                >
                    <span className="h-2 w-2 rounded-full bg-[#94d5a5] animate-pulse" />
                    Live Data
                </span>

                {/* Heading */}
                <h1
                    className="
                        mt-5
                        text-4xl
                        md:text-5xl
                        lg:text-6xl
                        font-bold
                        tracking-tight
                        text-white
                    "
                >
                    Global Cricket Rankings
                </h1>

                {/* Description */}
                <p
                    className="
                        mt-4
                        max-w-2xl
                        text-base
                        md:text-lg
                        leading-relaxed
                        text-gray-400
                    "
                >
                    Track the latest ICC team, batting, bowling and
                    all-rounder rankings with deep historical data
                    and trend analysis.
                </p>
            </div>
        </section>
    );
}

export default RankingsHero;