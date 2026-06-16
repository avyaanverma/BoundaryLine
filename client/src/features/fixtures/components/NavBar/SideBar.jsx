import { BarChart2, HelpCircle, LayoutDashboard, LogOut, Plus, Settings, Trophy } from "lucide-react";
import { NavLink } from "react-router";




function Sidebar() {
    const NAV_ITEMS = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
        { icon: BarChart2, label: "Analytics", path: "/analytics" },
        { icon: Trophy, label: "Matches", path: "/matches" },
        { icon: Settings, label: "Settings", path: "/settings" },
        { icon: HelpCircle, label: "Support", path: "/helpcircle" },
    ];
    return (
        <aside className="fixed left-0 top-20 h-[calc(100vh-80px)] w-[280px] bg-[#1a1c1f]/95 backdrop-blur-lg border-r border-white/10 shadow-xl hidden lg:flex flex-col p-4 gap-2">
            <div className="mb-6">
                <h2 className="text-xs font-semibold text-[#8a938a] uppercase tracking-widest mb-2 px-2">
                    Main Menu
                </h2>
                <div className="space-y-1">
                    {NAV_ITEMS.map(({ icon: Icon, label, path }) => (
                        <NavLink
                            key={label}
                            to={path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 p-4 rounded-lg transition-transform hover:translate-x-1 group ${isActive
                                    ? "bg-[#004a26] text-[#79b98b] font-bold"
                                    : "text-[#c0c9bf] hover:bg-[#333538]/50"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon
                                        className={`w-5 h-5 ${isActive ? "" : "group-hover:text-[#94d5a5]"
                                            }`}
                                    />
                                    <span className="text-xs font-semibold">{label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>

            <div className="mt-auto pt-4 border-t border-white/5">
                <button className="w-full flex items-center justify-center gap-2 bg-[#97d940] text-[#1f3700] px-4 py-2 rounded-xl font-bold hover:brightness-110 transition-all mb-4 text-sm">
                    <Plus className="w-4 h-4" /> Create Match
                </button>
                <a
                    href="#"
                    className="flex items-center gap-4 p-4 text-[#ffb4ab] hover:bg-[#ffb4ab]/10 rounded-lg transition-transform hover:translate-x-1"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-xs font-semibold">Logout</span>
                </a>
            </div>
        </aside>
    );
}

export default Sidebar