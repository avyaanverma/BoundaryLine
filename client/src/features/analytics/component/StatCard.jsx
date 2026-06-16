function StatCard({
    icon: Icon,
    title,
    value,
    badge,
}) {
    return (
        <div
            className="
                rounded-3xl
                border border-[#94d5a5]/10
                bg-gradient-to-br
                from-[#11161c]
                via-[#151b20]
                to-[#11161c]
                p-6
                min-h-[200px]
                flex
                flex-col
                justify-between
                hover:border-[#94d5a5]/25
                hover:-translate-y-1
                hover:shadow-[0_10px_25px_rgba(148,213,165,0.08)]
                transition-all
                duration-300
            "
        >
            {/* Top */}
            <div className="flex items-start justify-between">

                <div
                    className="
                        h-12
                        w-12
                        rounded-xl
                        bg-[#94d5a5]/10
                        flex
                        items-center
                        justify-center
                    "
                >
                    <Icon
                        className="text-[#94d5a5]"
                        size={22}
                    />
                </div>

                <span
                    className="
                        text-xs
                        md:text-sm
                        font-medium
                        text-[#94d5a5]
                    "
                >
                    {badge}
                </span>

            </div>

            {/* Content */}
            <div className="mt-8">

                <h3
                    className="
                        text-gray-400
                        text-lg
                        md:text-xl
                        font-medium
                        mb-3
                    "
                >
                    {title}
                </h3>

                <p
                    className="
                        text-4xl
                        md:text-5xl
                        lg:text-6xl
                        font-bold
                        text-white
                        tracking-tight
                    "
                >
                    {value}
                </p>

            </div>
        </div>
    );
}

export default StatCard;