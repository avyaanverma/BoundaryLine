import { Search } from "lucide-react";

function TopNav() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-[#111316]/80 backdrop-blur-xl border-b border-white/10 shadow-sm h-20">
            <div className="flex justify-between items-center px-6 h-full max-w-[1440px] mx-auto">
                <div className="flex items-center gap-10">
                    <span className="text-2xl font-bold text-[#94d5a5]">BoundaryLine</span>
                    <div className="hidden md:flex items-center gap-6">
                        {["Scores", "Schedule", "Teams", "Players", "Rankings", "News"].map(
                            (item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className={`text-base transition-colors ${item === "Schedule"
                                        ? "text-[#94d5a5] font-bold border-b-2 border-[#94d5a5] pb-1"
                                        : "text-[#c0c9bf] hover:text-[#94d5a5]"
                                        }`}
                                >
                                    {item}
                                </a>
                            )
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-[#c0c9bf] hover:text-[#94d5a5] p-2 transition-all">
                        <Search className="w-5 h-5" />
                    </button>
                    <div className="hidden md:flex items-center gap-2">
                        <button className="px-4 py-1 text-xs font-semibold text-[#e2e2e6] hover:bg-white/5 rounded transition-all">
                            Login
                        </button>
                        <button className="bg-[#94d5a5] text-[#00391c] px-6 py-1 text-xs font-bold rounded-lg hover:brightness-110 transition-all">
                            Signup
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default TopNav