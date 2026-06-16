function RankingTabs({
    activeTab,
    setActiveTab,
}) {
    const tabs = [
        "Teams",
        "Batters",
        "Bowlers",
        "All-Rounders",
    ];

    return (
        <div className="border-b border-white/10">

            <div className="flex gap-8 overflow-x-auto">

                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() =>
                            setActiveTab(tab)
                        }
                        className={`
                            relative
                            pb-4
                            text-sm
                            md:text-base
                            font-medium
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
                                    h-[2px]
                                    w-full
                                    bg-[#94d5a5]
                                "
                            />
                        )}
                    </button>
                ))}

            </div>
        </div>
    );
}

export default RankingTabs;