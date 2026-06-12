import {
    Users,
    Trophy,
    UserRound,
    CalendarDays,
    PersonStanding,
    TrendingUp,
} from "lucide-react";

import StatCard from "./StatCard";

const analyticsData = {
    "Mumbai Strikers": {
        totalTeams: 12,
        totalMatches: 148,
        totalPlayers: 240,
        runs: 12450,
        wickets: 842,
        avgScore: 164.5,
    },

    "Delhi Titans": {
        totalTeams: 10,
        totalMatches: 120,
        totalPlayers: 210,
        runs: 10500,
        wickets: 650,
        avgScore: 145.2,
    },

    "Bangalore Royals": {
        totalTeams: 14,
        totalMatches: 160,
        totalPlayers: 260,
        runs: 13800,
        wickets: 910,
        avgScore: 172.3,
    },

    "Chennai Kings": {
        totalTeams: 11,
        totalMatches: 132,
        totalPlayers: 220,
        runs: 11800,
        wickets: 720,
        avgScore: 158.8,
    },
};

function StatsCards({ selectedTeam }) {
    const currentData =
        analyticsData[selectedTeam] ||
        analyticsData["Mumbai Strikers"];

    const stats = [
        {
            title: "Total Teams",
            value: currentData.totalTeams,
            badge: "+2 Growth",
            icon: Users,
        },
        {
            title: "Total Matches",
            value: currentData.totalMatches,
            badge: "92% Complete",
            icon: Trophy,
        },
        {
            title: "Total Players",
            value: currentData.totalPlayers,
            badge: "Active Roster",
            icon: UserRound,
        },
        {
            title: "Tournament Runs",
            value: currentData.runs.toLocaleString(),
            badge: "128.4 avg/team",
            icon: CalendarDays,
        },
        {
            title: "Tournament Wickets",
            value: currentData.wickets,
            badge: "5.6/match",
            icon: PersonStanding,
        },
        {
            title: "Average Score",
            value: currentData.avgScore,
            badge: "+8.2% vs S'23",
            icon: TrendingUp,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {stats.map((stat) => (
                <StatCard
                    key={stat.title}
                    {...stat}
                />
            ))}
        </div>
    );
}

export default StatsCards;