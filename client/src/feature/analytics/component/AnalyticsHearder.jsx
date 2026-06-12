import { CalendarDays } from "lucide-react";

function AnalyticsHearder() {
    return (
        <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-lime-400 tracking-tight">
                Apex Premier League
            </h1>

            <div className="flex items-center gap-3 mt-4 text-gray-300 text-xl">
                <CalendarDays size={22} />
                <span>Season 2024</span>

                <span className="text-gray-500">•</span>

                <span>Jan 01 - Dec 31</span>
            </div>
        </div>
    );
}

export default AnalyticsHearder;