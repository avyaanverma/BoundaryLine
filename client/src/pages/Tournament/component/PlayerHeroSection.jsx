import { Globe } from "lucide-react";

function PlayerHeroSection() {
    return (
        <div className="space-y-5">
            {/* Heading */}
            <div>
                <h2 className="text-3xl font-bold text-white">
                    Player Management
                </h2>

                <p className="mt-2 text-slate-400">
                    Configure and draft new talent into the global database.
                </p>
            </div>

            {/* Player Card */}
            <div
                className="
          relative
          overflow-hidden
          rounded-[24px]
          border border-slate-800
          bg-[#081425]
          h-[500px]
        "
            >
                {/* Image */}
                <img
                    src="/images/player.png"
                    alt="Player"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Overlay */}
                <div
                    className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/40
            to-transparent
          "
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span
                        className="
              inline-flex
              rounded-md
              bg-[#4ADE80]
              px-3
              py-1
              text-xs
              font-bold
              tracking-wider
              text-black
            "
                    >
                        DRAFT PROFILE
                    </span>

                    <h2
                        className="
              mt-4
              text-5xl
              font-black
              uppercase
              leading-none
              text-white
            "
                    >
                        PLAYER
                        <br />
                        NAME
                    </h2>

                    <div className="mt-5 flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-slate-300">
                            <Globe size={14} />
                            Country
                        </span>

                        <span className="text-[#4ADE80]">•</span>

                        <span className="font-semibold text-[#4ADE80]">
                            ROLE
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayerHeroSection;