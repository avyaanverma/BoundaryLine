function TournamentChart() {
    const bars = [45, 62, 30, 70, 95, 62, 45, 75];

    return (
        <div className="bg-[#171717] border border-lime-500/20 rounded-2xl p-8">
            <h2 className="text-2xl text-white mb-8">
                Runs Scored Per Match
            </h2>

            <div className="flex items-end justify-between h-72 gap-1">
                {bars.map((bar, index) => (
                    <div
                        key={index}
                        className={`flex-1 rounded-t-sm ${index === 4
                            ? "bg-lime-400"
                            : "bg-lime-700/50"
                            }`}
                        style={{
                            height: `${bar}%`,
                        }}
                    />
                ))}
            </div>

            <div className="flex justify-between mt-6 text-gray-400 text-sm font-mono">
                <span>MATCH 1</span>
                <span>MATCH 74</span>
                <span>LATEST</span>
            </div>
        </div>
    );
}

export default TournamentChart;