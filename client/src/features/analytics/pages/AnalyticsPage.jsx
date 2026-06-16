import { useState } from "react";

import AnalyticsHearder from "../component/AnalyticsHearder";
import AnalyticsFilters from "../component/AnalyticsFilters";
import StatCards from "../component/StatsCards";
import TeamLeaderboard from "../component/TeamLeaderboard";
import TournamentChart from "../component/TournamentChart";
import WicketDistribution from "../component/WicketDistribution";
import TournamentMVPs from "../component/BestPerformer";

function AnalyticsPage() {
    const [selectedTeam, setSelectedTeam] =
        useState("Mumbai Strikers");

    return (
        <div
            className="
                min-h-screen
                bg-gradient-to-b
                from-[#070b12]
                via-[#0d1318]
                to-[#11161c]
                w-full
                
            "
        >
            {/* Container */}
            <div
                className="
                    max-w-[1420px]
                    mx-auto
                    px-4
                    md:px-6
                    lg:px-8
                    py-8
                    space-y-8
                "
            >
                {/* Header */}
                <AnalyticsHearder />

                {/* Filters */}
                <AnalyticsFilters
                    selectedTeam={selectedTeam}
                    setSelectedTeam={setSelectedTeam}
                />

                {/* Stats */}
                <StatCards
                    selectedTeam={selectedTeam}
                />

                {/* Leaderboard */}
                <TeamLeaderboard />

                {/* Charts */}
                <div
                    className="
                        grid
                        grid-cols-1
                        xl:grid-cols-2
                        gap-6
                        xl:gap-8
                    "
                >
                    <TournamentChart />
                    <WicketDistribution />
                </div>

                {/* MVP */}
                <TournamentMVPs />
            </div>
        </div>
    );
}

export default AnalyticsPage;