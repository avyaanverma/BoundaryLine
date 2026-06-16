import { TrendingUp, Users, BarChart3 } from "lucide-react";

function HeroSection() {
    const stats = [
        {
            title: "Active Tournaments",
            value: "24",
            subtitle: "+3 this week",
            icon: TrendingUp,
        },
        {
            title: "Registered Teams",
            value: "156",
            subtitle: "Global",
            icon: Users,
        },
        {
            title: "Total Matches Tracked",
            value: "12.4k",
            subtitle: "All-time",
            icon: BarChart3,
        },
    ];

    return (
        <div className="flex flex-col gap-6">
            {/* Hero Banner */}
            <div
                className="
          bg-gradient-to-r
          from-[#08111f]
          via-[#08111f]
          to-[#12261d]
          border border-slate-700/20
          rounded-[32px]
          p-10
          overflow-hidden
          relative
        "
            >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#4ADE80]/20 bg-[#4ADE80]/10">
                    <span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                    <span className="text-sm font-medium tracking-wide text-[#9AE6B4]">
                        TOURNAMENT ANALYTICS
                    </span>
                </div>

                {/* Heading */}
                <h1 className="text-5xl xl:text-5xl font-bold leading-tight text-white">
                    Create a New
                    <span className="block bg-gradient-to-r from-[#9AE6B4] to-[#4ADE80] bg-clip-text text-transparent">
                        Tournament
                    </span>
                </h1>

                {/* Description */}
                <p className="mt-6 text-xl text-slate-400 max-w-2xl leading-relaxed">
                    Organize leagues, manage teams, and track match analytics seamlessly
                    across the global cricket ecosystem.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="space-y-4">
                {stats.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="
                bg-[#0B1220]/80
                backdrop-blur-xl
                border border-slate-700/30
                rounded-3xl
                p-6
                hover:border-[#4ADE80]/30
                hover:shadow-[0_0_30px_rgba(74,222,128,0.08)]
                transition-all
                duration-300
              "
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-slate-400 mb-3">
                                        {item.title}
                                    </p>

                                    <div className="flex items-end gap-3">
                                        <h2 className="text-5xl font-bold text-white">
                                            {item.value}
                                        </h2>

                                        <span className="text-[#9AE6B4] font-semibold mb-2">
                                            {item.subtitle}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-3 rounded-2xl bg-[#4ADE80]/10">
                                    <Icon className="w-6 h-6 text-[#4ADE80]" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>


        </div>
    );
}

export default HeroSection;