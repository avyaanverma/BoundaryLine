function StatCard({
    title,
    value,
    change,
    changeColor,
    borderColor,
    valueColor
}) {
    return (
        <div
            className={`bg-[#18191d] border border-gray-700 border-l-4 ${borderColor} rounded-xl p-5 min-w-[300px]`}
        >
            <p className="text-gray-400 text-sm mb-2">
                {title}
            </p>

            <div className="flex items-center justify-between">
                <h2 className={`text-4xl font-bold ${valueColor}`}>
                    {value}
                </h2>

                <span className={`font-medium ${changeColor}`}>
                    {change}
                </span>
            </div>
        </div>
    );
}

export default StatCard;

