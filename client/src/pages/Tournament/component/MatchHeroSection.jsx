import { Trophy, CalendarDays } from "lucide-react";

function MatchHeroSection() {
    return (
        <div className="flex flex-col gap-5">
            <div className="rounded-[30px] border border-slate-800 bg-gradient-to-b from-[#02122A] to-[#08251D] p-7">
                <span className="inline-flex rounded-full border border-[#4ADE80]/20 bg-[#4ADE80]/10 px-4 py-1 text-xs font-semibold text-[#4ADE80]">
                    MATCH SCHEDULER
                </span>

                <h1 className="mt-6 text-5xl font-bold text-white leading-tight">
                    Create
                    <br />
                    Match
                </h1>

                <p className="mt-5 text-slate-400 leading-8">
                    Schedule and configure new matches for the global series.
                    Define teams, venues and initial match states.
                </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-[#081425] p-5">
                <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-[#4ADE80]/10 p-4">
                        <Trophy className="text-[#4ADE80]" />
                    </div>

                    <div>
                        <p className="text-xs text-slate-400 uppercase">
                            Active Series
                        </p>

                        <h2 className="text-5xl font-bold text-[#4ADE80]">
                            12
                        </h2>
                    </div>
                </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-[#081425] p-5">
                <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-lime-500/10 p-4">
                        <CalendarDays className="text-lime-400" />
                    </div>

                    <div>
                        <p className="text-xs text-slate-400 uppercase">
                            Pending Fixtures
                        </p>

                        <h2 className="text-5xl font-bold text-lime-400">
                            45
                        </h2>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default MatchHeroSection;