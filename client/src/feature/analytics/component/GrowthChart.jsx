function GrowthChart() {
    const bars = [45, 32, 52, 40, 65, 56, 72, 69, 65];

    return (
        <div className="bg-[#18191d] border border-gray-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-white">
                    User Growth & Traffic
                </h2>

                <div className="flex gap-2">
                    <button className="bg-[#333538] px-4 py-2 rounded text-white">
                        Line
                    </button>

                    <button className="px-4 py-2 text-gray-400">
                        Area
                    </button>
                </div>
            </div>

            <div className="bg-[#131417] rounded-lg h-[320px] flex items-end gap-1 p-5 relative">
                {bars.map((height, index) => (
                    <div
                        key={index}
                        className="bg-green-900/30 border-t border-green-300 flex-1"
                        style={{
                            height: `${height}%`,
                        }}
                    />
                ))}

                <div className="absolute top-[45%] left-[32%] bg-[#333538] border border-gray-700 px-4 py-3 rounded-md text-green-300 text-sm">
                    Peak: 124,050 New Users
                </div>
            </div>
        </div>
    );
}

export default GrowthChart;