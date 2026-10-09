import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../../../shared/components/NavBar";
import {
  UserPlus,
  Trophy,
  UsersRound,
  Radio,
  Tv,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useSelector } from "react-redux";

const STEPS = [
  {
    id: "account",
    num: "01",
    title: "Creating Accounts & Authentication",
    role: "All Users",
    icon: UserPlus,
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    description: "Registering an account unlocks full tournament creation, scoring privileges, and custom team management.",
    instructions: [
      {
        title: "Sign Up for Free",
        detail: "Click 'Sign Up' in the header. Choose standard USER account or ADMIN/SCORER permissions.",
      },
      {
        title: "Session & Token Management",
        detail: "BoundaryLine uses HTTP-only secure JWT cookies and persistent local state. Your session restores automatically on page refresh.",
      },
      {
        title: "Google Sign-In Support",
        detail: "Authenticate instantly using Google OAuth with one-click token exchange.",
      },
    ],
    ctaText: "Create Free Account",
    ctaLink: "/userregister",
  },
  {
    id: "tournament",
    num: "02",
    title: "Creating & Hosting Tournaments",
    role: "League Organizers",
    icon: Trophy,
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    description: "Set up corporate cups, grassroots leagues, academy tournaments, or bilateral series in under 2 minutes.",
    instructions: [
      {
        title: "Click 'Create Tournament'",
        detail: "Navigate to the Tournaments page and click 'Create Tournament'. If you are not logged in, you will be prompted to authenticate.",
      },
      {
        title: "Fill Tournament Configuration",
        detail: "Specify Tournament Name, Match Format (T20 / ODI / Test / 10-Over), Start & End Dates, and Venue.",
      },
      {
        title: "Assign Authorized Scorers",
        detail: "Delegate scoring rights to official scorers by selecting their accounts from the delegation menu.",
      },
    ],
    ctaText: "Browse & Create Tournaments",
    ctaLink: "/tournaments",
  },
  {
    id: "teams",
    num: "03",
    title: "Managing Teams & Squad Rosters",
    role: "Team Managers",
    icon: UsersRound,
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    description: "Build team squads, upload vibrant logos, assign playing XIs, and track player career statistics.",
    instructions: [
      {
        title: "Create Team Profiles",
        detail: "Provide Team Name, Short Code (e.g. MUM, DEL, BLR), primary brand color, and SVG logo URL.",
      },
      {
        title: "Add Players & Assign Roles",
        detail: "Add squad members with roles (Batsman, Bowler, All-Rounder, Wicket Keeper) and batting/bowling styles.",
      },
      {
        title: "Assign Captains & Keepers",
        detail: "Designate team captain and wicket-keeper for official match sheets.",
      },
    ],
    ctaText: "Explore Teams Directory",
    ctaLink: "/teams",
  },
  {
    id: "scoring",
    num: "04",
    title: "Ball-by-Ball Live Scoring Console",
    role: "Official Scorers",
    icon: Radio,
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    description: "Real-time cricket scoring console with instant WebSocket broadcast, undo/redo state history, and extras handling.",
    instructions: [
      {
        title: "Open Scorer Console",
        detail: "Authorized scorers can access /scorer and select any active match assigned to them.",
      },
      {
        title: "Record Balls & Extras",
        detail: "Tap 0, 1, 2, 4, 6 or Wicket. Handle extras like Wides (WD), No Balls (NB), Byes (BYE), and Leg Byes (LB).",
      },
      {
        title: "Wicket Dismissal Wizard",
        detail: "Select dismissal type (Bowled, Caught, LBW, Run Out, Stumped), out batter, catcher/fielder, and incoming new batter.",
      },
      {
        title: "Instant Live Broadcast",
        detail: "Every ball event instantly updates all connected viewers worldwide via Socket.IO real-time channels.",
      },
    ],
    ctaText: "Open Scorer Console",
    ctaLink: "/scorer",
  },
  {
    id: "watching",
    num: "05",
    title: "Watching Live Matches & Statistics",
    role: "Cricket Fans & Scouts",
    icon: Tv,
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    description: "Experience broadcast-quality live scorecards, ball-by-ball commentary, win probability trends, and top performer widgets.",
    instructions: [
      {
        title: "Select Any Live Match",
        detail: "From the Home page or Matches tab, click any live card to enter the full scoreboard page.",
      },
      {
        title: "Live Commentary Feed",
        detail: "Follow real-time commentary updates with over summaries, boundaries, and wicket callouts.",
      },
      {
        title: "Win Probability Graph",
        detail: "Track dynamic win probability calculated automatically based on Required Run Rate and historical targets.",
      },
    ],
    ctaText: "View Live Matches",
    ctaLink: "/matches",
  },
];

export default function HowToPage() {
  const [activeStepId, setActiveStepId] = useState("account");
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const activeStep = STEPS.find((s) => s.id === activeStepId) || STEPS[0];

  return (
    <div className="min-h-screen bg-[#090d0f] text-[#eef2ef] font-sans">
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-24 pb-16">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#94d5a5]/10 border border-[#94d5a5]/20 text-[#94d5a5] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles size={14} />
            Comprehensive Platform Guide
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            How BoundaryLine Works
          </h1>
          <p className="text-base sm:text-lg text-[#a0aaa0] leading-relaxed">
            Everything you need to know about creating tournaments, managing teams, scoring live matches, and broadcasting cricket online.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === activeStepId;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                  isActive
                    ? "bg-[#94d5a5] text-[#04210e] shadow-lg shadow-[#94d5a5]/20"
                    : "bg-white/5 text-[#c0c9bf] hover:bg-white/10 hover:text-white border border-white/5"
                }`}
              >
                <Icon size={16} />
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Content Card */}
        <div className="bg-[#111518]/90 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#94d5a5]/10 border border-[#94d5a5]/30 flex items-center justify-center text-[#94d5a5]">
                <activeStep.icon size={28} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-[#94d5a5]">STEP {activeStep.num}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${activeStep.badgeColor}`}>
                    {activeStep.role}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {activeStep.title}
                </h2>
              </div>
            </div>

            <button
              onClick={() => navigate(activeStep.ctaLink)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#94d5a5] to-[#16a34a] text-[#04210e] font-bold text-sm hover:shadow-lg hover:shadow-[#94d5a5]/20 transition shrink-0"
            >
              <span>{activeStep.ctaText}</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <p className="text-base text-[#b0bab0] my-6 leading-relaxed">
            {activeStep.description}
          </p>

          {/* Instructions List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {activeStep.instructions.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#94d5a5]/30 transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#94d5a5]/10 text-[#94d5a5] font-mono text-xs font-bold flex items-center justify-center mb-4 group-hover:bg-[#94d5a5] group-hover:text-[#04210e] transition">
                  {idx + 1}
                </div>
                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[#94d5a5] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#8a938a] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Start Guide Banner */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#142319] via-[#0e1912] to-[#142319] border border-[#94d5a5]/20 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Ready to Host Your Tournament?
            </h3>
            <p className="text-sm text-[#94d5a5]/80 max-w-xl">
              Log in to your account and launch live cricket scoring for your league in just a few clicks.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <Link
                to="/userlogin"
                className="px-6 py-3 rounded-xl bg-[#94d5a5] text-[#04210e] font-bold text-sm hover:opacity-90 transition"
              >
                Sign In to Start
              </Link>
            ) : (
              <Link
                to="/tournaments?create=true"
                className="px-6 py-3 rounded-xl bg-[#94d5a5] text-[#04210e] font-bold text-sm hover:opacity-90 transition"
              >
                Create Tournament Now
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
