import { Funnel } from "lucide-react";

function AnalyticsFilters({
    selectedTeam,
    setSelectedTeam,
}) {
    return (
        <div className="flex flex-wrap items-center gap-4 mb-10">
            <select className="px-6 py-3 rounded-2xl border border-lime-500 bg-lime-500/10 text-lime-400">
                <option>Season: 2024</option>
            </select>

            <select
                value={selectedTeam}
                onChange={(e) =>
                    setSelectedTeam(e.target.value)
                }
                className="px-6 py-3 rounded-2xl border border-gray-700 bg-[#292a2a] text-gray-300"
            >
                <option>Mumbai Strikers</option>
                <option>Delhi Titans</option>
                <option>Bangalore Royals</option>
                <option>Chennai Kings</option>
            </select>

            <select className="px-6 py-3 rounded-2xl border border-gray-700 bg-[#292a2a] text-gray-300">
                <option>T20</option>
                <option>ODI</option>
                <option>Test</option>
            </select>

            <select className="px-6 py-3 rounded-2xl border border-gray-700 bg-[#292a2a] text-gray-300">
                <option>Ongoing</option>
                <option>Completed</option>
                <option>Upcoming</option>
            </select>

            <button className="text-gray-300 hover:text-white">
                <Funnel size={22} />
            </button>
        </div>
    );
}

export default AnalyticsFilters;