import { TrendingUp, TrendingDown, Minus } from "lucide-react";

function TeamCard({ team }) {
  return (
    <div
      className="
                relative
                overflow-hidden
                rounded-3xl
                border border-[#94d5a5]/10
                bg-gradient-to-br
                from-[#11161c]
                via-[#151b20]
                to-[#11161c]
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#94d5a5]/25
                hover:shadow-[0_15px_35px_rgba(148,213,165,0.08)]
            "
    >
      {/* Left Accent */}
      <div
        className="absolute left-0 top-0 h-full w-1"
        style={{
          backgroundColor: team.borderColor,
          boxShadow: `0 0 12px ${team.borderColor}`,
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between">
        <img
          src={team.flag}
          alt={team.name}
          className="
                        w-14
                        h-10
                        rounded-lg
                        object-cover
                        border border-white/10
                    "
        />

        <div className="text-right">
          <p
            className="
                            text-[11px]
                            font-semibold
                            tracking-[0.2em]
                            uppercase
                        "
            style={{
              color: team.borderColor,
            }}
          >
            Ranked #{team.rank}
          </p>

          {/* Rank Movement */}
          <div className="flex items-center justify-end gap-1 mt-2">
            {team.rankChange > 0 && (
              <>
                <TrendingUp size={14} className="text-green-400" />
                <span className="text-xs text-green-400 font-semibold">
                  +{team.rankChange}
                </span>
              </>
            )}

            {team.rankChange < 0 && (
              <>
                <TrendingDown size={14} className="text-red-400" />
                <span className="text-xs text-red-400 font-semibold">
                  {team.rankChange}
                </span>
              </>
            )}

            {team.rankChange === 0 && (
              <>
                <Minus size={14} className="text-gray-500" />
                <span className="text-xs text-gray-500 font-semibold">0</span>
              </>
            )}
          </div>

          <p
            className="text-sm font-semibold mt-2"
            style={{
              color: team.borderColor,
            }}
          >
            {team.points} Points
          </p>
        </div>
      </div>

      {/* Team Info */}
      <div className="mt-6">
        <h2
          className="
                        text-2xl
                        md:text-3xl
                        font-bold
                        leading-tight
                        text-white
                    "
        >
          {team.name}
        </h2>

        <p className="mt-2 text-sm md:text-base text-gray-400">
          {team.board} • {team.region}
        </p>
      </div>

      {/* Captain */}
      <div
        className="
                    mt-6
                    rounded-2xl
                    border border-white/5
                    bg-white/[0.02]
                    p-4
                    flex
                    items-center
                    gap-3
                "
      >
        <img
          src={team.captainImage}
          alt={team.captain}
          className="
                        w-12
                        h-12
                        rounded-full
                        object-cover
                        border border-[#94d5a5]/20
                    "
        />

        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Captain
          </p>

          <h4 className="text-base font-semibold text-white">{team.captain}</h4>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mt-5">
        <div
          className="
                        rounded-xl
                        bg-white/[0.02]
                        border border-white/5
                        p-3
                    "
        >
          <p className="text-xs uppercase text-gray-500">Format</p>

          <p className="mt-1 text-white font-semibold">{team.format}</p>
        </div>

        <div
          className="
                        rounded-xl
                        bg-white/[0.02]
                        border border-white/5
                        p-3
                    "
        >
          <p className="text-xs uppercase text-gray-500">Ranking</p>

          <p className="mt-1 text-[#94d5a5] font-semibold">#{team.rank}</p>
        </div>
      </div>

      {/* Button */}
      <button
        className="
                    w-full
                    mt-6
                    h-12
                    rounded-2xl
                    bg-[#94d5a5]/10
                    border border-[#94d5a5]/20
                    text-[#94d5a5]
                    text-sm
                    font-semibold
                    tracking-wide
                    hover:bg-[#94d5a5]
                    hover:text-[#08110d]
                    transition-all
                    duration-300
                "
      >
        VIEW FULL ROSTER
      </button>
    </div>
  );
}

export default TeamCard;
