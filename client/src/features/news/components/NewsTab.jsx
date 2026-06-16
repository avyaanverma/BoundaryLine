import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

export default function NewsTabs() {
    const [activeTab, setActiveTab] = useState("All News");

    const tabs = [
        "All News",
        "Analysis",
        "Series Updates",
        "Interviews",
        "Domestic",
    ];

    return (
        <>
            <div className="border-b border-white/10">
                <div className="flex items-center justify-between overflow-x-auto">

                    {/* Tabs */}
                    <div className="flex items-center gap-6 md:gap-8 min-w-max">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                    relative
                                    py-5
                                    text-sm md:text-2xl
                                    font-semibold
                                    whitespace-nowrap
                                    transition-all
                                    ${activeTab === tab
                                        ? "text-[#94d5a5]"
                                        : "text-gray-400 hover:text-white"
                                    }
                                `}
                            >
                                {tab}

                                {activeTab === tab && (
                                    <span
                                        className="
                                            absolute
                                            left-0
                                            bottom-0
                                            w-full
                                            h-[2px]
                                            bg-[#94d5a5]
                                        "
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Sort */}
                    <button
                        className="
                            hidden md:flex
                            items-center gap-2
                            text-gray-300
                            hover:text-white
                            transition-all
                        "
                    >
                        <SlidersHorizontal size={18} />
                        <span className="text-lg">
                            Sort by: Latest
                        </span>
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="mt-8">
                {activeTab === "All News" && (
                    <div className="text-white">
                        All News Content
                    </div>
                )}

                {activeTab === "Analysis" && (
                    <div className="text-white">
                        Analysis Content
                    </div>
                )}

                {activeTab === "Series Updates" && (
                    <div className="text-white">
                        Series Updates Content
                    </div>
                )}

                {activeTab === "Interviews" && (
                    <div className="text-white">
                        Interviews Content
                    </div>
                )}

                {activeTab === "Domestic" && (
                    <div className="text-white">
                        Domestic Content
                    </div>
                )}
            </div>
        </>
    );
}