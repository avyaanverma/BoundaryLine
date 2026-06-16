import {
    TrendingUp,
    Users,
    CalendarDays,
    Trophy,
} from "lucide-react";

function SeriesHeroSection() {
    return (
        <div className="space-y-5">
            {/* Heading */}
            <div>
                <h1 className="text-4xl font-bold text-white">
                    Create Series
                </h1>

                <p className="mt-2 text-slate-400">
                    Configure a new professional cricket championship with
                    custom rules and analytics tracking.
                </p>
            </div>

            {/* Banner */}
            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#081425]">
                <img
                    src="/images/stadium.jpg"
                    alt="Stadium"
                    className="h-[180px] w-full object-cover"
                />

                <div className="p-4">
                    <span className="rounded-md bg-[#4ADE80]/10 px-2 py-1 text-xs font-medium text-[#4ADE80]">
                        GLOBAL FORMAT
                    </span>

                    <h2 className="mt-3 text-2xl font-bold text-white">
                        Tournament Engine V2.4
                    </h2>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                {/* Teams */}
                <div className="rounded-2xl border border-slate-800 bg-[#081425] p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-400">
                            Total Teams
                        </p>

                        <Users
                            size={16}
                            className="text-[#4ADE80]"
                        />
                    </div>

                    <h3 className="mt-3 text-3xl font-bold text-[#4ADE80]">
                        12
                    </h3>
                </div>

                {/* Matches */}
                <div className="rounded-2xl border border-slate-800 bg-[#081425] p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-400">
                            Matches
                        </p>

                        <CalendarDays
                            size={16}
                            className="text-[#A3E635]"
                        />
                    </div>

                    <h3 className="mt-3 text-3xl font-bold text-[#A3E635]">
                        48
                    </h3>
                </div>

                {/* Revenue */}
                <div className="rounded-2xl border border-slate-800 bg-[#081425] p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-400">
                            Revenue Est.
                        </p>

                        <Trophy
                            size={16}
                            className="text-amber-400"
                        />
                    </div>

                    <h3 className="mt-3 text-xl font-bold text-white">
                        $2.4M
                    </h3>
                </div>
            </div>

            {/* Analytics */}
            <div className="rounded-3xl border border-slate-800 bg-[#081425] p-5">
                <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                        Series Analytics Overview
                    </h3>

                    <TrendingUp
                        size={18}
                        className="text-[#4ADE80]"
                    />
                </div>

                <div className="flex h-28 items-end gap-3">
                    {[40, 60, 35, 80, 55, 90, 45, 70].map((height, index) => (
                        <div
                            key={index}
                            style={{ height: `${height}%` }}
                            className="flex-1 rounded bg-gradient-to-t from-[#4ADE80]/20 to-[#4ADE80]/60"
                        />
                    ))}
                </div>

                <div className="mt-4 flex justify-between text-xs text-slate-500">
                    <span>Group Stage</span>
                    <span>Playoffs</span>
                    <span>Finals</span>
                </div>
            </div>
        </div>
    );
}

export default SeriesHeroSection;