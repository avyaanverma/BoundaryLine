

function StatCard({
    icon: Icon,
    title,
    value,
    badge,
}) {
    return (
        <div className="bg-[#171717] border border-lime-500/20 rounded-2xl p-6 flex flex-col justify-between min-h-[220px]">
            <div className="flex items-start justify-between">
                <Icon className="text-lime-400" size={28} />

                <span className="text-lime-400 text-sm font-medium">
                    {badge}
                </span>
            </div>

            <div className="mt-8">
                <h3 className="text-gray-300 text-3xl font-mono mb-3">
                    {title}
                </h3>

                <p className="text-6xl font-bold text-lime-400">
                    {value}
                </p>
            </div>
        </div>
    );
}

export default StatCard;