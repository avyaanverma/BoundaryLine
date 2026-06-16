import { Funnel } from "lucide-react";

function AnalyticsFilters({
    selectedTeam,
    setSelectedTeam,
}) {
    return (
        <div
            className="
                flex
                flex-wrap
                items-center
                gap-3
                lg:gap-4
                p-4
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-r
                from-[#161b22]
                via-[#1a1f26]
                to-[#161b22]
                mb-8
            "
        >
            {/* Season */}
            <select
                className="
                    h-12
                    px-5
                    rounded-full
                    border
                    border-[#94d5a5]/40
                    bg-[#94d5a5]/10
                    text-[#94d5a5]
                    text-sm
                    font-medium
                    outline-none
                    cursor-pointer
                "
            >
                <option>Season 2024</option>
                <option>Season 2023</option>
            </select>

            {/* Team */}
            <select
                value={selectedTeam}
                onChange={(e) =>
                    setSelectedTeam(e.target.value)
                }
                className="
                    h-12
                    px-5
                    rounded-full
                    border
                    border-white/10
                    bg-[#20252d]
                    text-gray-300
                    text-sm
                    outline-none
                    cursor-pointer
                    hover:border-[#94d5a5]/30
                "
            >
                <option>Mumbai Strikers</option>
                <option>Delhi Titans</option>
                <option>Bangalore Royals</option>
                <option>Chennai Kings</option>
            </select>

            {/* Format */}
            <select
                className="
                    h-12
                    px-5
                    rounded-full
                    border
                    border-white/10
                    bg-[#20252d]
                    text-gray-300
                    text-sm
                    outline-none
                    cursor-pointer
                "
            >
                <option>T20</option>
                <option>ODI</option>
                <option>Test</option>
            </select>

            {/* Status */}
            <select
                className="
                    h-12
                    px-5
                    rounded-full
                    border
                    border-white/10
                    bg-[#20252d]
                    text-gray-300
                    text-sm
                    outline-none
                    cursor-pointer
                "
            >
                <option>Ongoing</option>
                <option>Completed</option>
                <option>Upcoming</option>
            </select>

            {/* Filter Button */}
            <button
                className="
                    h-12
                    w-12
                    ml-auto
                    rounded-full
                    border
                    border-white/10
                    bg-[#20252d]
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    hover:text-[#94d5a5]
                    hover:border-[#94d5a5]/30
                    transition-all
                "
            >
                <Funnel size={18} />
            </button>
        </div>
    );
}

export default AnalyticsFilters;