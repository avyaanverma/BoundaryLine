import StatCards from "../component/StatsCards";
import AnalyticsHearder from "../component/AnalyticsHearder";
import AnalyticsFilters from "../component/AnalyticsFilters";
import TeamLeaderboard from "../component/TeamLeaderboard";
import WicketDistribution from "../component/WicketDistribution";
import TournamentMVPs from "../component/BestPerformer";
import TournamentChart from "../component/TournamentChart";
import { useState } from "react";


function AnalyticsPage() {
    const [selectedTeam, setSelectedTeam] =
        useState("Mumbai Strikers");
    return (
        <div className="p-8 space-y-8 bg-[#121414]">

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

            {/* Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <TournamentChart />
                <WicketDistribution />
            </div>

            {/* MVP Section */}
            <TournamentMVPs />

        </div>
    )
}

export default AnalyticsPage
