import { Bell } from "lucide-react";

function AnalyticsHearder() {
    return (
        <div className="flex items-center justify-between px-8 py-6">
            {/* Left Side */}
            <div>
                <h1 className="text-5xl font-bold text-white">
                    Analytics Overview
                </h1>

                <p className="text-gray-400 mt-1">
                    Real-time platform performance and administrative insights.
                </p>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">

                {/* Status Badge */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 bg-[#18191d]">
                    <div className="w-2 h-2 rounded-full bg-lime-400"></div>

                    <span className="text-xs font-semibold text-lime-400 uppercase tracking-wider">
                        Live Systems OK
                    </span>
                </div>

                {/* Notification */}
                <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-800 bg-[#18191d] text-gray-400 hover:text-white">
                    <Bell size={18} />
                </button>

                {/* Profile */}
                <div className="flex items-center gap-3 px-3 py-2 rounded-full border border-gray-800 bg-[#18191d]">
                    <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center font-bold text-white">
                        JD
                    </div>

                    <span className="text-white text-sm font-medium">
                        John Doe
                    </span>
                </div>

            </div>
        </div>
    );
}

export default AnalyticsHearder;