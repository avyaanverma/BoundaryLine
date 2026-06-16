import { TrendingUp } from "lucide-react";

const trendingNews = [
    {
        id: "01",
        title: "Record-breaking knock in the domestic league",
        readers: "45k readers",
        time: "2h ago",
    },
    {
        id: "02",
        title: "Transfer news: Key player moves to new franchise",
        readers: "32k readers",
        time: "5h ago",
    },
    {
        id: "03",
        title: "Controversy strikes in the recent Test match",
        readers: "28k readers",
        time: "1h ago",
    },
];

function TrendingNow() {
    return (
        <div
            className="
                rounded-3xl
                border border-white/10
                bg-[#171b22]
                p-5 md:p-6
            "
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <TrendingUp
                    size={22}
                    className="text-[#94d5a5]"
                />

                <h2 className="text-xl md:text-2xl font-bold text-white">
                    Trending Now
                </h2>
            </div>

            {/* News List */}
            <div className="space-y-6">
                {trendingNews.map((item) => (
                    <div
                        key={item.id}
                        className="
                            flex gap-3 md:gap-4
                            group
                            cursor-pointer
                        "
                    >
                        {/* Number */}
                        <span
                            className="
                                text-2xl md:text-3xl
                                font-bold
                                text-[#94d5a5]/35
                                shrink-0
                                leading-none
                            "
                        >
                            {item.id}
                        </span>

                        {/* Content */}
                        <div>
                            <h3
                                className="
                                    text-sm
                                    md:text-base
                                    font-semibold
                                    text-gray-200
                                    group-hover:text-white
                                    transition-colors
                                    leading-relaxed
                                "
                            >
                                {item.title}
                            </h3>

                            <p className="mt-1 text-xs md:text-sm text-gray-400">
                                {item.readers}
                                <span className="mx-2">•</span>
                                {item.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrendingNow;