import {
    Users,
    User,
    CalendarDays,
    Trophy,
} from "lucide-react";

const stats = [
    {
        title: "Ranked Teams",
        value: "104",
        subtitle: "+2 since last month",
        icon: Users,
    },
    {
        title: "Ranked Players",
        value: "1,248",
        subtitle: "Real-time updates",
        icon: User,
    },
    {
        title: "Weekly Updates",
        value: "Every Tue",
        subtitle: "Next: 14 Oct 2024",
        icon: CalendarDays,
    },
    {
        title: "Active Competitions",
        value: "12",
        subtitle: "ICC World Test Champ.",
        icon: Trophy,
    },
];

function RankingsStats() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {stats.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.title}
                        className="
                            rounded-2xl
                            border border-[#94d5a5]/10
                            bg-gradient-to-br
                            from-[#11161c]
                            via-[#151b20]
                            to-[#11161c]
                            p-6
                            min-h-[150px]
                            hover:border-[#94d5a5]/25
                            hover:-translate-y-1
                            hover:shadow-[0_10px_25px_rgba(148,213,165,0.08)]
                            transition-all
                            duration-300
                        "
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between">

                            <span className="text-sm font-medium text-gray-400">
                                {item.title}
                            </span>

                            <div
                                className="
                                    h-10
                                    w-10
                                    rounded-xl
                                    bg-[#94d5a5]/10
                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                <Icon
                                    size={18}
                                    className="text-[#94d5a5]"
                                />
                            </div>

                        </div>

                        {/* Value */}
                        <div className="mt-8">

                            <h3 className="text-4xl font-bold text-white">
                                {item.value}
                            </h3>

                            <p className="mt-3 text-sm text-[#94d5a5]">
                                {item.subtitle}
                            </p>

                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default RankingsStats;