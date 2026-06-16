function HeroSection() {
  return (
    <section
      className="
                relative
                overflow-hidden
                rounded-3xl
                border border-[#94d5a5]/10
                bg-gradient-to-br
                from-[#11161c]
                via-[#151b20]
                to-[#11161c]
                px-6
                py-10
                md:px-10
                md:py-14
            "
    >
      {/* Glow */}
      <div
        className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_top_right,rgba(148,213,165,0.15),transparent_40%)]
                "
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Badge */}
        <span
          className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border border-[#94d5a5]/20
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
          🌍 International Rankings
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
          Global Cricket Teams
        </h1>

        {/* Description */}
        <p
          className="
                        mt-5
                        max-w-3xl
                        text-base
                        md:text-lg
                        leading-relaxed
                        text-gray-400
                    "
        >
          Explore international squads, domestic franchises, player rosters,
          rankings, recent performances and detailed team statistics from around
          the cricketing world.
        </p>

        {/* Stats */}
        <div className="mt-8 flex flex-wrap gap-6">
          <div>
            <p className="text-3xl font-bold text-[#94d5a5]">104+</p>
            <span className="text-sm text-gray-500">Ranked Teams</span>
          </div>

          <div>
            <p className="text-3xl font-bold text-[#94d5a5]">12</p>
            <span className="text-sm text-gray-500">Active Leagues</span>
          </div>

          <div>
            <p className="text-3xl font-bold text-[#94d5a5]">2.5K+</p>
            <span className="text-sm text-gray-500">Registered Players</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
