import { useState, useEffect } from "react";
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
} from "lucide-react";
import { NavLink } from "react-router";

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

/** Live / Upcoming card with full scorecard layout */
function MatchCardFull({ format, seriesName, subtitle, status, team1, team2, footer }) {
  return (
    <GlassPanel
      className={`rounded-2xl overflow-hidden ${FORMAT_BORDER[format]} group hover:shadow-2xl hover:shadow-[#94d5a5]/10 transition-all duration-300`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <span
              className={`text-xs font-semibold uppercase ${format === "test"
                ? "text-[#ff4d4d]"
                : format === "odi"
                  ? "text-[#97d940]"
                  : "text-[#94d5a5]"
                }`}
            >
              {seriesName}
            </span>
            <span className="text-[#c0c9bf] text-sm">{subtitle}</span>
          </div>
          <StatusBadge status={status} />
        </div>

        {/* Teams */}
        <div className="space-y-4 mb-6">
          {[team1, team2].map((team, i) => (
            <div
              key={i}
              className={`flex items-center justify-between ${i === 1 ? "opacity-80" : ""
                }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#282a2d] flex items-center justify-center border border-white/10 overflow-hidden">
                  {team.flagBg ? (
                    <div
                      className="w-6 h-4 rounded text-[8px] font-bold flex items-center justify-center"
                      style={{ background: team.flagBg, color: team.flagText || "#fff" }}
                    >
                      {team.code}
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-[#94d5a5]">{team.code}</span>
                  )}
                </div>
                <span className="text-2xl font-semibold">{team.name}</span>
              </div>
              <span
                className={`text-[40px] font-bold leading-none tracking-tight ${team.scoreStyle === "primary"
                  ? "text-[#94d5a5]"
                  : team.scoreStyle === "muted"
                    ? "text-[#c0c9bf] italic"
                    : "text-[#e2e2e6]"
                  }`}
              >
                {team.score}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          {footer}
        </div>
      </div>
    </GlassPanel>
  );
}

/** Result card (simpler layout) */
function MatchCardResult({ seriesName, subtitle, team1, team2, resultText }) {
  return (
    <GlassPanel
      className={`rounded-2xl overflow-hidden ${FORMAT_BORDER.test} group opacity-90 hover:opacity-100 transition-all duration-300`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase text-[#ff4d4d]">
              {seriesName}
            </span>
            <span className="text-[#c0c9bf] text-sm">{subtitle}</span>
          </div>
          <StatusBadge status="RESULT" />
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-base">{team1.name}</span>
            <span className="text-2xl font-semibold text-[#c0c9bf]">{team1.score}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-[#94d5a5]">{team2.name}</span>
            <span className="text-2xl font-semibold text-[#94d5a5]">{team2.score}</span>
          </div>
        </div>

        <div className="py-2 px-4 bg-[#004a26]/20 rounded-lg text-[#94d5a5] text-xs font-bold text-center mb-4">
          {resultText}
        </div>

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

/** Upcoming countdown card */
function MatchCardCountdown({ seriesName, subtitle, team1, team2, countdown }) {
  const [time, setTime] = useState(countdown);

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
              {seriesName}
            </span>
            <span className="text-[#c0c9bf] text-sm">{subtitle}</span>
          </div>
          <StatusBadge status="UPCOMING" />
        </div>

        {/* VS layout */}
        <div className="flex items-center justify-around py-4 mb-4">
          {[team1, team2].map((team, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#282a2d] flex items-center justify-center border border-white/10 mb-2 mx-auto shadow-inner">
                <span className="text-sm font-bold text-[#94d5a5]">{team.code}</span>
              </div>
              <span className="text-xs font-semibold">{team.name}</span>
            </div>
          ))}
        </div>

        {/* Countdown overlaid between teams — re-create the original centred VS block */}
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

// ─── Tomorrow list row ────────────────────────────────────────────────────────

function TomorrowRow({ time, team1Code, team2Code, seriesLabel, venue }) {
  return (
    <div className="p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 hover:bg-white/5 transition-colors group">
      {/* Time */}
      <div className="flex flex-col items-center md:items-start min-w-[120px]">
        <span className="text-[#94d5a5] font-bold text-2xl">{time}</span>
        <span className="text-[#8a938a] text-xs font-semibold uppercase">IST</span>
      </div>

      {/* Teams */}
      <div className="flex-grow flex items-center justify-center md:justify-start gap-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#282a2d] flex items-center justify-center border border-white/10">
            <span className="text-xs font-bold text-[#94d5a5]">{team1Code}</span>
          </div>
          <span className="text-2xl font-semibold">{team1Code}</span>
        </div>
        <span className="text-[#8a938a] font-bold">VS</span>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold">{team2Code}</span>
          <div className="w-10 h-10 rounded-full bg-[#282a2d] flex items-center justify-center border border-white/10">
            <span className="text-xs font-bold text-[#94d5a5]">{team2Code}</span>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-col md:items-end flex-shrink-0">
        <span className="text-[#c0c9bf] text-xs font-semibold">{seriesLabel}</span>
        <span className="text-[#8a938a] text-sm">{venue}</span>
      </div>

      <NotifyButton />
    </div>
  );
}

// ─── Mini card (Later this month) ────────────────────────────────────────────

function MiniMatchCard({ date, format, team1, team2 }) {
  return (
    <GlassPanel className="p-4 rounded-xl hover:border-[#94d5a5]/50 transition-all cursor-pointer">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-bold text-[#8a938a] uppercase tracking-wider">
          {date}
        </span>
        <FormatPill format={format} />
      </div>

      <div className="flex items-center justify-between mb-4">
        {[team1, team2].map((team, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-8 h-8 rounded bg-[#282a2d] border border-white/5 mb-1 overflow-hidden flex items-center justify-center">
              <span className="text-[9px] font-bold text-[#94d5a5]">{team}</span>
            </div>
            <span className="text-xs font-semibold">{team}</span>
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

// ─── Topnav ───────────────────────────────────────────────────────────────────

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

// ─── Filters bar ─────────────────────────────────────────────────────────────

const FORMATS = ["All Formats", "T20", "ODI", "Test"];

function FiltersBar() {
  const [activeFormat, setActiveFormat] = useState("All Formats");

  return (
    <GlassPanel className="rounded-2xl p-4 mb-10 sticky top-24 z-40">
      <div className="flex flex-wrap items-center gap-4">
        {/* Category select */}
        <div className="flex items-center gap-1 bg-[#282a2d] rounded-full px-4 py-1 border border-white/10">
          <Globe className="w-4 h-4 text-[#8a938a]" />
          <select className="bg-transparent border-none focus:ring-0 text-xs font-semibold text-[#e2e2e6] outline-none">
            <option>International</option>
            <option>Domestic</option>
            <option>All Matches</option>
          </select>
        </div>

        {/* Format pills */}
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

        {/* Live counter */}
        <div className="ml-auto flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full bg-[#94d5a5]"
            style={{ animation: "pulse-dot 2s infinite" }}
          />
          <span className="text-xs font-semibold text-[#e2e2e6]">3 Live Now</span>
        </div>
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FixturesPage() {
  const [view, setView] = useState("list");

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

      <TopNav />
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
        {/* Background Glow */}
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

          {/* Header */}
          <header className="py-10 flex flex-col md:flex-row md:items-end justify-between gap-6">

            <div>
              <nav className="flex items-center gap-2 text-gray-500 mb-2">
                <span className="text-xs font-semibold">
                  HOME
                </span>

                <ChevronRight className="w-3 h-3" />

                <span className="text-xs font-semibold text-[#94d5a5]">
                  FIXTURES
                </span>
              </nav>

              <h1
                className="
                  text-4xl
                  md:text-5xl
                  font-bold
                  tracking-tight
                  text-white
                "
              >
                Match Schedule
              </h1>

              <p className="mt-2 max-w-2xl text-gray-400">
                Track upcoming internationals, domestic leagues,
                ICC tournaments and world championships in one place.
              </p>
            </div>

            <ViewToggle
              view={view}
              onChange={setView}
            />
          </header>

          <FiltersBar />

          {/* TODAY */}
          <section className="mb-14">
            <SectionDivider
              label="Today"
              date="OCT 24"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8">

              <MatchCardFull
                format="t20"
                seriesName="ICC Men's T20 World Cup"
                subtitle="Final • Barbados"
                status="LIVE"
                team1={{
                  code: "IND",
                  name: "India",
                  score: "176/7",
                  scoreStyle: "primary",
                }}
                team2={{
                  code: "SA",
                  name: "South Africa",
                  score: "Yet to bat",
                  scoreStyle: "muted",
                }}
              />

              <MatchCardCountdown
                seriesName="Bilateral Series"
                subtitle="1st ODI • London"
                team1={{
                  code: "ENG",
                  name: "England",
                }}
                team2={{
                  code: "AUS",
                  name: "Australia",
                }}
                countdown="04:32:15"
              />

              <MatchCardResult
                seriesName="ICC WTC Final"
                subtitle="Day 5 • The Oval"
                team1={{
                  name: "New Zealand",
                  score: "245 & 140/2",
                }}
                team2={{
                  name: "Pakistan",
                  score: "217 & 167",
                }}
                resultText="Pakistan won by 8 wickets"
              />
            </div>
          </section>

          {/* TOMORROW */}
          <section className="mb-14">
            <SectionDivider
              label="Tomorrow"
              date="OCT 25"
            />

            <GlassPanel className="rounded-2xl overflow-hidden divide-y divide-white/5">
              <TomorrowRow
                time="14:00"
                team1Code="SL"
                team2Code="BAN"
                seriesLabel="Asia Cup • Match 12"
                venue="Pallekele Int. Stadium"
              />

              <TomorrowRow
                time="19:30"
                team1Code="WI"
                team2Code="AFG"
                seriesLabel="T20 Series • Match 3"
                venue="Kensington Oval, Barbados"
              />
            </GlassPanel>
          </section>

          {/* LATER THIS MONTH */}
          <section className="mb-14">
            <SectionDivider
              label="Later This Month"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

              <MiniMatchCard
                date="OCT 28"
                format="T20I"
                team1="AUS"
                team2="SA"
              />

              <MiniMatchCard
                date="OCT 30"
                format="TEST"
                team1="PAK"
                team2="NZ"
              />

              <MiniMatchCard
                date="NOV 02"
                format="ODI"
                team1="IND"
                team2="ENG"
              />

              <GlassPanel
                className="
                  p-4
                  rounded-xl
                  bg-[#94d5a5]/5
                  border border-[#94d5a5]/20
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  cursor-pointer
                  hover:bg-[#94d5a5]/10
                  transition-all
                "
              >
                <CalendarCheck className="w-6 h-6 text-[#94d5a5] mb-2" />

                <span className="text-sm font-semibold text-[#94d5a5]">
                  View Full Month
                </span>
              </GlassPanel>

            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
