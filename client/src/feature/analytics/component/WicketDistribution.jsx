function WicketDistribution() {
    return (
        <div className="bg-[#171717] border border-lime-500/20 rounded-2xl p-8">
            <h2 className="text-2xl text-white mb-10">
                Wickets Distribution
            </h2>

            <div className="flex justify-center">
                <div className="w-52 h-52 border-[14px] border-lime-900 rounded-xl flex flex-col items-center justify-center">
                    <h3 className="text-6xl text-lime-400 font-semibold">
                        842
                    </h3>

                    <span className="text-gray-400 uppercase tracking-wider mt-2">
                        Total
                    </span>
                </div>
            </div>

            <div className="flex justify-between mt-12 text-xl">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-lime-400" />
                    <span className="text-gray-300">
                        Pace: 58%
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-lime-900" />
                    <span className="text-gray-300">
                        Spin: 42%
                    </span>
                </div>
            </div>
        </div>
    );
}

export default WicketDistribution;