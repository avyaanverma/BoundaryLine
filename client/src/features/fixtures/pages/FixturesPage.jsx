import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Globe,
  Bell,
  Share2,
  List,
  CalendarDays,
  LayoutDashboard,
  BarChart2,
  Trophy,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
  Info,
  CalendarCheck,
  ChevronRight,
  AtSign,
  Rss,
  MessageSquare,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import Navbar from "../../../shared/components/NavBar";
import { useMatchesQuery } from "../../../shared/hooks/useQueries.js";
import { UserRole } from "../../scorer-console/pages/type.js";
import {useSelector} from "react-redux";

// ─── Colour / design tokens (mirrors tailwind config) ────────────────────────
// Primary:  #94d5a5  |  Secondary: #97d940  |  Tertiary: #ffb3b0
// Surface:  #111316  |  Error: #ffb4ab

// ─── Reusable Primitives ─────────────────────────────────────────────────────

/** Glass panel */
function GlassPanel({ children, className = "" }) {
  return (
    <div
      className={`
        bg-[#151b20]/80
        backdrop-blur-xl
        border border-[#94d5a5]/10
        shadow-[0_8px_25px_rgba(0,0,0,0.25)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/** Format accent border on match cards */
const FORMAT_BORDER = {
  t20: "border-l-4 border-l-[#94d5a5]",
  odi: "border-l-4 border-l-[#c7f36b]",
  test: "border-l-4 border-l-[#ff6b6b]",
};

/** Status badge */
function StatusBadge({ status }) {
  const map = {
    LIVE: "bg-red-500/15 text-red-400 border border-red-500/20",
    UPCOMING:
      "bg-[#94d5a5]/10 text-[#94d5a5] border border-[#94d5a5]/20",
    COMPLETED:
      "bg-white/[0.03] text-gray-400 border border-white/5",
    RESULT:
      "bg-white/[0.03] text-gray-400 border border-white/5",
  };

  return (
    <span
      className={`
        px-2.5
        py-1
        rounded-full
        font-semibold
        text-xs
        flex
        items-center
        gap-1
        ${map[status] ?? map.UPCOMING}
      `}
    >
      {status === "LIVE" && (
        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
      )}
      {status}
    </span>
  );
}

/** Format pill */
function FormatPill({ format }) {
  const colors = {
    T20I: "text-[#94d5a5]",
    T20: "text-[#94d5a5]",
    ODI: "text-[#c7f36b]",
    TEST: "text-[#ff6b6b]",
  };

  return (
    <span
      className={`
        text-[10px]
        bg-[#1b2229]
        border border-white/5
        px-2
        py-1
        rounded-full
        font-bold
        tracking-wide
        ${colors[format] ?? "text-white"}
      `}
    >
      {format}
    </span>
  );
}

/** Section divider */
function SectionDivider({ label, date }) {
  return (
    <div className="flex items-center gap-4 mb-6">

      <h3 className="text-2xl font-bold text-white whitespace-nowrap">
        {label}
      </h3>

      {date && (
        <span
          className="
            px-3
            py-1
            rounded-full
            bg-[#94d5a5]/10
            border border-[#94d5a5]/20
            text-[#94d5a5]
            text-xs
            font-semibold
          "
        >
          {date}
        </span>
      )}

      <div className="h-px flex-grow bg-[#94d5a5]/10" />
    </div>
  );
}

/** Notification button */
function NotifyButton({ className = "" }) {
  return (
    <button
      className={`
        p-2.5
        rounded-full
        bg-[#1b2229]
        border border-white/5
        text-gray-300
        hover:bg-[#94d5a5]
        hover:text-[#08110d]
        hover:shadow-[0_0_20px_rgba(148,213,165,0.25)]
        transition-all
        duration-300
        group-hover:scale-110
        ${className}
      `}
    >
      <Bell className="w-5 h-5" />
    </button>
  );
}
// ─── Match Cards ─────────────────────────────────────────────────────────────


/** Live / active match card with score display */
function MatchCardFull({ match, onClick }) {
  const format = "t20";
  const userRole = useSelector((state)=> state.auth.role);
  const navigate = useNavigate();
  
  const handleClick = (id)=>{
    const hasAdminAccess = userRole === UserRole.SUPER_ADMIN || userRole === UserRole.ADMIN;
    console.log(hasAdminAccess);
    if(hasAdminAccess){
      navigate(`/admin/matches`)
    }else{
      navigate(`/matches/${id}`);
    }
  }

  return (
    <GlassPanel
      className={`rounded-2xl overflow-hidden ${FORMAT_BORDER[format]} group hover:shadow-2xl hover:shadow-[#94d5a5]/10 transition-all duration-300 cursor-pointer`}
      >
      <div
      onClick={()=> handleClick(match._id)}
      className="p-6">
        
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase text-[#94d5a5]">
              {match.series || "Match"}
            </span>
            <span className="text-[#c0c9bf] text-sm">{match.subtitle || match.venue}</span>
          </div>
          <StatusBadge status={match.status} />
        </div>

        <div className="space-y-4 mb-6">
          {[match.team1, match.team2].map((team, i) => (
            <div
              key={i}
              className={`flex items-center justify-between ${i === 1 ? "opacity-80" : ""}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#282a2d] flex items-center justify-center border border-white/10 overflow-hidden">
                  {team.logo ? (
                    <img src={team.logo} alt={team.shortName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-[#94d5a5]">{team.shortName}</span>
                  )}
                </div>
                <span className="text-2xl font-semibold">{team.shortName}</span>
              </div>
              <span className="text-[40px] font-bold leading-none tracking-tight text-[#e2e2e6]">
                {team.shortName}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-xs text-[#8a938a]">
            {new Date(match.startTime).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </span>
          <span className="text-xs font-semibold text-[#94d5a5]">VIEW DETAILS →</span>
        </div>
      </div>
    </GlassPanel>
  );
}

/** Upcoming countdown card */
function MatchCardCountdown({ match }) {
  const startTime = new Date(match.startTime);
  const now = new Date();
  const diffMs = Math.max(0, startTime - now);
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const [time, setTime] = useState(
    [hours, minutes, seconds].map((v) => String(v).padStart(2, "0")).join(":")
  );

  useEffect(() => {
    const id = setInterval(() => {
      setTime((prev) => {
        let [h, m, s] = prev.split(":").map(Number);
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return "00:00:00";
        return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <GlassPanel
      className={`rounded-2xl overflow-hidden ${FORMAT_BORDER.odi} group hover:shadow-2xl hover:shadow-[#97d940]/10 transition-all duration-300`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase text-[#97d940]">
              {match.series || "Upcoming"}
            </span>
            <span className="text-[#c0c9bf] text-sm">{match.venue}</span>
          </div>
          <StatusBadge status="UPCOMING" />
        </div>

        <div className="flex items-center justify-around py-4 mb-4">
          {[match.team1, match.team2].map((team, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#282a2d] flex items-center justify-center border border-white/10 mb-2 mx-auto shadow-inner">
                <span className="text-sm font-bold text-[#94d5a5]">{team.shortName}</span>
              </div>
              <span className="text-xs font-semibold">{team.shortName}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center -mt-16 mb-4 pointer-events-none">
          <div className="text-center px-6">
            <div className="text-[#97d940] text-[40px] font-bold leading-none mb-1">VS</div>
            <div className="text-[10px] text-[#8a938a] uppercase font-bold tracking-tighter">
              {time}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
          <button className="flex items-center justify-center gap-1 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition-all text-xs font-bold">
            <Bell className="w-4 h-4" /> ADD REMINDER
          </button>
          <button className="flex items-center justify-center gap-1 py-2 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-xs font-bold">
            <Info className="w-4 h-4" /> PREVIEW
          </button>
        </div>
      </div>
    </GlassPanel>
  );
}

/** Result/completed match card */
function MatchCardResult({ match }) {
  return (
    <GlassPanel
      className={`rounded-2xl overflow-hidden ${FORMAT_BORDER.test} group opacity-90 hover:opacity-100 transition-all duration-300`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase text-[#ff4d4d]">
              {match.series || "Match"}
            </span>
            <span className="text-[#c0c9bf] text-sm">{match.venue}</span>
          </div>
          <StatusBadge status="COMPLETED" />
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-base">{match.team1.shortName}</span>
            <span className="text-2xl font-semibold text-[#c0c9bf]">{match.team1.shortName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-[#94d5a5]">{match.team2.shortName}</span>
            <span className="text-2xl font-semibold text-[#94d5a5]">{match.team2.shortName}</span>
          </div>
        </div>

        {match.result && (
          <div className="py-2 px-4 bg-[#004a26]/20 rounded-lg text-[#94d5a5] text-xs font-bold text-center mb-4">
            {match.result}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <button className="text-[#c0c9bf] text-xs font-semibold hover:text-[#e2e2e6] transition-colors">
            Highlights
          </button>
          <button className="text-[#c0c9bf] hover:text-[#94d5a5] transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </GlassPanel>
  );
}

/** Tomorrow list row */
function TomorrowRow({ match }) {
  const time = new Date(match.startTime).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 hover:bg-white/5 transition-colors group">
      <div className="flex flex-col items-center md:items-start min-w-[120px]">
        <span className="text-[#94d5a5] font-bold text-2xl">{time}</span>
        <span className="text-[#8a938a] text-xs font-semibold uppercase">IST</span>
      </div>

      <div className="flex-grow flex items-center justify-center md:justify-start gap-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#282a2d] flex items-center justify-center border border-white/10">
            <span className="text-xs font-bold text-[#94d5a5]">{match.team1.shortName}</span>
          </div>
          <span className="text-2xl font-semibold">{match.team1.shortName}</span>
        </div>
        <span className="text-[#8a938a] font-bold">VS</span>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold">{match.team2.shortName}</span>
          <div className="w-10 h-10 rounded-full bg-[#282a2d] flex items-center justify-center border border-white/10">
            <span className="text-xs font-bold text-[#94d5a5]">{match.team2.shortName}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:items-end flex-shrink-0">
        <span className="text-[#c0c9bf] text-xs font-semibold">{match.series || "Match"}</span>
        <span className="text-[#8a938a] text-sm">{match.venue}</span>
      </div>

      <NotifyButton />
    </div>
  );
}

/** Mini card for later matches */
function MiniMatchCard({ match, date }) {
  return (
    <GlassPanel className="p-4 rounded-xl hover:border-[#94d5a5]/50 transition-all cursor-pointer">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-bold text-[#8a938a] uppercase tracking-wider">
          {date}
        </span>
        <FormatPill format="T20" />
      </div>

      <div className="flex items-center justify-between mb-4">
        {[match.team1, match.team2].map((team, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-8 h-8 rounded bg-[#282a2d] border border-white/5 mb-1 overflow-hidden flex items-center justify-center">
              <span className="text-[9px] font-bold text-[#94d5a5]">{team.shortName}</span>
            </div>
            <span className="text-xs font-semibold">{team.shortName}</span>
          </div>
        ))}
        <span className="text-[#8a938a] font-bold text-sm">V</span>
      </div>

      <button className="w-full py-1 text-[10px] font-bold border border-white/5 rounded hover:bg-white/5 transition-all text-[#c0c9bf]">
        REMIND ME
      </button>
    </GlassPanel>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: BarChart2, label: "Analytics", path: "/analytics" },
  { icon: Trophy, label: "Matches", path: "/matches" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Support", path: "/helpcircle" },
];

function Sidebar() {
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

// ─── Filters bar ─────────────────────────────────────────────────────────────

const FORMATS = ["All Formats", "T20", "ODI", "Test"];

function FiltersBar({ liveCount }) {
  const [activeFormat, setActiveFormat] = useState("All Formats");

  return (
    <GlassPanel className="rounded-2xl p-4 mb-10 sticky top-24 z-40">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1 bg-[#282a2d] rounded-full px-4 py-1 border border-white/10">
          <Globe className="w-4 h-4 text-[#8a938a]" />
          <select className="bg-transparent border-none focus:ring-0 text-xs font-semibold text-[#e2e2e6] outline-none">
            <option>International</option>
            <option>Domestic</option>
            <option>All Matches</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {FORMATS.map((fmt) => (
            <button
              key={fmt}
              onClick={() => setActiveFormat(fmt)}
              className={`px-4 py-1 rounded-full border text-xs font-semibold transition-all ${activeFormat === fmt
                ? "border-[#94d5a5] text-[#94d5a5]"
                : "border-white/10 text-[#c0c9bf] hover:border-[#94d5a5]"
                }`}
            >
              {fmt}
            </button>
          ))}
        </div>

        {liveCount > 0 && (
          <div className="ml-auto flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-[#94d5a5]"
              style={{ animation: "pulse-dot 2s infinite" }}
            />
            <span className="text-xs font-semibold text-[#e2e2e6]">{liveCount} Live Now</span>
          </div>
        )}
      </div>
    </GlassPanel>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function FooterLinkGroup({ title, links }) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-[#e2e2e6] mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map(({ label, active }) => (
          <li key={label}>
            <a
              href="#"
              className={`text-sm transition-colors ${active
                ? "text-[#94d5a3] underline"
                : "text-[#c0c9bf] hover:text-[#e2e2e6]"
                }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  const SOCIAL = [AtSign, Rss, MessageSquare];
  return (
    <footer className="lg:ml-[280px] bg-[#0c0e11] border-t border-[#404941] w-full py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 max-w-[1440px] mx-auto">
        <div>
          <span className="text-2xl font-bold text-[#94d5a5] block mb-4">BoundaryLine</span>
          <p className="text-[#c0c9bf] text-sm">
            The ultimate destination for real-time cricket data, analytics, and fan
            engagement. Experience the game like never before.
          </p>
        </div>

        <FooterLinkGroup
          title="Quick Links"
          links={[
            { label: "Live Scores" },
            { label: "Match Fixtures", active: true },
            { label: "Rankings" },
            { label: "Cricket News" },
          ]}
        />
        <FooterLinkGroup
          title="Support"
          links={[
            { label: "About Us" },
            { label: "Privacy Policy" },
            { label: "Terms of Service" },
            { label: "Contact Us" },
          ]}
        />

        <div>
          <h4 className="text-xs font-semibold text-[#e2e2e6] mb-4">Stay Connected</h4>
          <div className="flex gap-4 mb-4">
            {SOCIAL.map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-[rgba(30,32,35,0.7)] border border-white/[0.08] flex items-center justify-center hover:text-[#94d5a5] transition-all"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          <p className="text-[10px] text-[#8a938a]">
            © 2024 BoundaryLine Analytics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── View toggle ──────────────────────────────────────────────────────────────

function ViewToggle({ view, onChange }) {
  return (
    <div className="flex items-center gap-1 bg-[#1e2023] p-1 rounded-xl border border-white/5">
      {[
        { id: "list", icon: List, label: "List" },
        { id: "calendar", icon: CalendarDays, label: "Calendar" },
      ].map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg font-bold text-xs transition-all ${view === id
            ? "bg-[#94d5a5] text-[#00391c] shadow-lg shadow-[#94d5a5]/20"
            : "text-[#c0c9bf] hover:text-[#94d5a5]"
            }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
}

// ─── Loading / Error / Empty States ───────────────────────────────────────────

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 className="w-8 h-8 text-[#94d5a5] animate-spin" />
      <p className="text-[#c0c9bf] text-sm font-semibold">Loading matches...</p>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <AlertCircle className="w-10 h-10 text-red-400" />
      <p className="text-red-400 text-sm font-semibold">Failed to load matches</p>
      <p className="text-[#8a938a] text-xs">{message}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Trophy className="w-10 h-10 text-[#94d5a5] opacity-40" />
      <p className="text-[#c0c9bf] text-sm font-semibold">No matches found</p>
      <p className="text-[#8a938a] text-xs">Matches will appear here once they are created.</p>
    </div>
  );
}

// ─── Format Date Helper ──────────────────────────────────────────────────────

function formatDateLabel(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const matchDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffDays = Math.floor((matchDate - today) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return { label: "Today", showDate: false };
  if (diffDays === 1) return { label: "Tomorrow", showDate: false };

  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const month = months[date.getMonth()];
  const day = date.getDate();

  if (diffDays <= 7) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return { label: days[date.getDay()], showDate: true, date: `${month} ${day}` };
  }

  return { label: "Later This Month", showDate: true, date: `${month} ${day}` };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FixturesPage() {
  const [view, setView] = useState("list");
  const { data: matches = [], isLoading, isError, error } = useMatchesQuery();
  const navigate = useNavigate();

  const grouped = useMemo(() => {
    const groups = { today: [], tomorrow: [], upcoming: [], completed: [], later: [] };
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);

    matches.forEach((match) => {
      const matchDate = new Date(match.startTime);
      const matchDayStart = new Date(matchDate.getFullYear(), matchDate.getMonth(), matchDate.getDate());

      if (match.status === "COMPLETED" || match.status === "PLAYING_XI_SELECTED" || match.result) {
        groups.completed.push(match);
      } else if (match.status === "LIVE" || match.status === "INNINGS_BREAK" || match.status === "TOSS_COMPLETED") {
        groups.today.push(match);
      } else if (matchDayStart.getTime() === todayStart.getTime()) {
        groups.today.push(match);
      } else if (matchDayStart.getTime() === tomorrowStart.getTime()) {
        groups.tomorrow.push(match);
      } else {
        groups.later.push(match);
      }
    });

    return groups;
  }, [matches]);

  const liveCount = matches.filter(
    (m) => m.status === "LIVE" || m.status === "INNINGS_BREAK" || m.status === "TOSS_COMPLETED"
  ).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

        * {
          font-family: 'Inter', sans-serif;
        }

        body {
          background:
            linear-gradient(
              180deg,
              #070b12 0%,
              #0d1318 50%,
              #11161c 100%
            );
          color: #e2e2e6;
          overflow-x: hidden;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #070b12;
        }

        ::-webkit-scrollbar-thumb {
          background: #2b343d;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #3b4650;
        }

        @keyframes pulse-dot {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(148,213,165,0.7);
          }

          70% {
            transform: scale(1);
            box-shadow: 0 0 0 6px rgba(148,213,165,0);
          }

          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(148,213,165,0);
          }
        }
      `}</style>

      <Navbar/>
      <Sidebar />

      <main
        className="
          relative
          lg:ml-[280px]
          pt-20
          px-4
          md:px-6
          min-h-screen
          pb-10
        "
      >
        <div
          className="
            absolute
            top-0
            right-0
            w-[450px]
            h-[450px]
            bg-[#94d5a5]/5
            blur-[140px]
            rounded-full
            pointer-events-none
          "
        />

        <div className="max-w-[1500px] mx-auto">

          <header className="py-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <nav className="flex items-center gap-2 text-gray-500 mb-2">
                <span className="text-xs font-semibold">HOME</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-xs font-semibold text-[#94d5a5]">FIXTURES</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Match Schedule
              </h1>
              <p className="mt-2 max-w-2xl text-gray-400">
                Track upcoming internationals, domestic leagues,
                ICC tournaments and world championships in one place.
              </p>
            </div>
            <ViewToggle view={view} onChange={setView} />
          </header>

          <FiltersBar liveCount={liveCount} />

          {isLoading ? (
            <LoadingState />
          ) : isError ? (
            <ErrorState message={error?.message} />
          ) : matches.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* LIVE / TODAY */}
              {grouped.today.length > 0 && (
                <section className="mb-14">
                  <SectionDivider label="Today / Live" />
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8">
                    {grouped.today.map((match) => (
                      <MatchCardFull
                        key={match._id}
                        match={match}
                        onClick={() => navigate(`/matches/${match._id}`)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* TOMORROW */}
              {grouped.tomorrow.length > 0 && (
                <section className="mb-14">
                  <SectionDivider label="Tomorrow" />
                  <GlassPanel className="rounded-2xl overflow-hidden divide-y divide-white/5">
                    {grouped.tomorrow.map((match) => (
                      <TomorrowRow key={match._id} match={match} />
                    ))}
                  </GlassPanel>
                </section>
              )}

              {/* UPCOMING / LATER */}
              {grouped.later.length > 0 && (
                <section className="mb-14">
                  <SectionDivider label="Upcoming" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {grouped.later.slice(0, 8).map((match) => {
                      const fd = formatDateLabel(match.startTime);
                      return (
                        <MiniMatchCard
                          key={match._id}
                          match={match}
                          date={fd.showDate ? fd.date : match.team1.shortName + " vs " + match.team2.shortName}
                        />
                      );
                    })}
                    <GlassPanel className="p-4 rounded-xl bg-[#94d5a5]/5 border border-[#94d5a5]/20 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#94d5a5]/10 transition-all">
                      <CalendarCheck className="w-6 h-6 text-[#94d5a5] mb-2" />
                      <span className="text-sm font-semibold text-[#94d5a5]">View Full Month</span>
                    </GlassPanel>
                  </div>
                </section>
              )}

              {/* COMPLETED / RESULTS */}
              {grouped.completed.length > 0 && (
                <section className="mb-14">
                  <SectionDivider label="Completed Matches" />
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8">
                    {grouped.completed.slice(0, 3).map((match) => (
                      <MatchCardResult key={match._id} match={match} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
