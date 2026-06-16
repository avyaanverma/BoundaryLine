import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Trophy,
  UsersRound,
  UserPlus,
  CalendarPlus,
  ListOrdered,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../app/store/index.js";
import { logoutAdmin } from "../../auth/admin/index.js";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Matches",
    path: "/admin/matches",
    icon: CalendarPlus,
  },
  {
    label: "Teams",
    path: "/admin/teams",
    icon: UsersRound,
  },
  {
    label: "Players",
    path: "/admin/players",
    icon: UserPlus,
  },
  {
    label: "Series",
    path: "/admin/series",
    icon: ListOrdered,
  },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);

  const handleLogout = async () => {
    await logoutAdmin();
    dispatch(logout());
    navigate("/adminlogin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#090d0f] text-[#eef2ef] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#101518] flex flex-col shrink-0">
        <div className="p-5 border-b border-white/10">
          <Link to="/admin" className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#94d5a5] font-black text-[#06361f]">
              BL
            </span>
            <span>
              <span className="block text-lg font-black text-white">BoundaryLine</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#94d5a5]">
                Admin Console
              </span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map(({ label, path, icon: Icon, end }) => {
            const isActive = end
              ? location.pathname === path
              : location.pathname.startsWith(path);
            return (
              <Link
                key={label}
                to={path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#94d5a5]/10 text-[#94d5a5] border border-[#94d5a5]/20"
                    : "text-[#aeb8b0] hover:bg-white/5 hover:text-white border border-transparent"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#94d5a5]/5 border border-[#94d5a5]/10">
            <ShieldCheck className="h-4 w-4 text-[#94d5a5]" />
            <span className="text-xs font-semibold text-[#94d5a5]">{role || "ADMIN"}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold text-[#ffb3ad] hover:bg-[#ffb3ad]/10 transition-all"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-[1440px] mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
