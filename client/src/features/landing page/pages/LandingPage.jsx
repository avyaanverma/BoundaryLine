import { useState, useEffect, useRef } from "react";
import {
  Zap,
  ChevronLeft,
  ChevronRight,
  Bell,
  ArrowRight,
  BarChart2,
  Globe,
  Share2,
  Mail,
  Smartphone,
  BookOpen,
} from "lucide-react";

// ─── Tailwind config (injected via CDN in real app; kept as reference) ───────
// Colors, spacing, font-sizes are from the original tailwind.config.

// ─── Reusable Components ──────────────────────────────────────────────────────

/** Pulsing live indicator dot */
function LiveDot() {
  return (
    <span
      className="inline-block w-2 h-2 rounded-full bg-[#97d940]"
      style={{
        animation: "pulse 1.5s infinite",
      }}
    />
  );
}

/** Primary / secondary button */
function Button({ variant = "primary", children, className = "", ...props }) {
  const base =
    "font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer";
  const variants = {
    primary:
      "bg-[#94d5a5] text-[#00391c] px-10 py-4 rounded-lg text-2xl hover:brightness-110 hover:scale-105",
    secondary:
      "border border-[#97d940] text-[#97d940] px-10 py-4 rounded-lg text-2xl hover:bg-[#97d940]/10",
    icon: "bg-[rgba(26,28,31,0.7)] backdrop-blur-xl border border-white/10 p-2 rounded-full hover:bg-white/10",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

/** Glass card wrapper */
function GlassCard({ children, className = "", accentVariant }) {
  const accent =
    accentVariant === "test"
      ? "border-l-4 border-l-[#BE1E2D]"
      : accentVariant === "t20"
      ? "border-l-4 border-l-[#94d5a5]"
      : "";
  return (
    <div
      className={`bg-[rgba(30,32,35,0.6)] backdrop-blur-xl border border-white/5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[rgba(51,53,56,0.8)] hover:border-[#94d5a5]/30 hover:-translate-y-1 ${accent} ${className}`}
    >
      {children}
    </div>
  );
}

/** Badge / pill label */
function Badge({ color = "secondary", children }) {
  const colors = {
    secondary: "bg-[#97d940]/20 text-[#97d940]",
    tertiary: "bg-[#ffb3b0]/20 text-[#ffb3b0]",
  };
  return (
    <span
      className={`text-xs font-semibold tracking-widest uppercase px-2 py-1 rounded ${colors[color]}`}
    >
      {children}
    </span>
  );
}

/** Live score card used in the carousel */
function LiveMatchCard({ type, accentVariant, label, team1, team2, status }) {
  return (
    <GlassCard
      accentVariant={accentVariant}
      className="min-w-[400px] snap-center p-6 rounded-xl flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mb-4">
        <Badge color={accentVariant === "test" ? "tertiary" : "secondary"}>
          {label}
        </Badge>
        <div className="flex items-center gap-1">
          <LiveDot />
          <span className="text-[#97d940] font-bold text-xs tracking-widest">
            LIVE
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Team 1 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#1e2023] flex items-center justify-center font-bold text-sm">
              {team1.code}
            </div>
            <span className="text-2xl font-semibold">{team1.name}</span>
          </div>
          <span className="text-[40px] font-bold leading-none tracking-tight">
            {team1.score}{" "}
            {team1.overs && (
              <span className="text-sm font-normal text-[#c0c9bf]">
                ({team1.overs})
              </span>
            )}
          </span>
        </div>
        {/* Team 2 */}
        <div className="flex justify-between items-center opacity-60">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#1e2023] flex items-center justify-center font-bold text-sm">
              {team2.code}
            </div>
            <span className="text-2xl font-semibold">{team2.name}</span>
          </div>
          <span className="text-[40px] font-bold leading-none tracking-tight">
            {team2.score}{" "}
            {team2.overs && (
              <span className="text-sm font-normal text-[#c0c9bf]">
                ({team2.overs})
              </span>
            )}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5">
        <p
          className={`text-sm ${
            status.highlight ? "text-[#94d5a5]" : "text-[#c0c9bf]"
          }`}
        >
          {status.text}
        </p>
      </div>
    </GlassCard>
  );
}

/** Upcoming match row */
function UpcomingMatchRow({ day, month, title, venue }) {
  return (
    <GlassCard className="p-4 rounded-lg flex items-center justify-between group">
      <div className="flex items-center gap-6">
        <div className="text-center min-w-[60px] border-r border-white/5 pr-4">
          <p className="text-[#94d5a5] font-bold">{day}</p>
          <p className="text-xs uppercase text-[#c0c9bf]">{month}</p>
        </div>
        <div>
          <p className="text-base font-semibold">{title}</p>
          <p className="text-xs text-[#c0c9bf]">{venue}</p>
        </div>
      </div>
      <Bell className="text-[#c0c9bf] group-hover:text-[#94d5a5] transition-colors w-5 h-5" />
    </GlassCard>
  );
}

/** Recent result row */
function RecentResultRow({ label, result, team1Score, team2Score }) {
  return (
    <GlassCard className="p-4 rounded-lg flex items-center justify-between">
      <div>
        <p className="text-xs text-[#c0c9bf] mb-1">{label}</p>
        <p className="text-base font-semibold">{result}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-[#97d940]">{team1Score}</p>
        <p className="text-xs text-[#c0c9bf]">{team2Score}</p>
      </div>
    </GlassCard>
  );
}

/** Feature card */
function FeatureCard({ icon: Icon, iconColor, bgColor, title, description, highlighted }) {
  return (
    <GlassCard
      className={`p-10 rounded-2xl flex flex-col items-center text-center ${
        highlighted ? "border-[#94d5a5]/20 bg-[#94d5a5]/5" : ""
      }`}
    >
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${bgColor}`}
      >
        <Icon className={`w-10 h-10 ${iconColor}`} />
      </div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-base text-[#c0c9bf]">{description}</p>
    </GlassCard>
  );
}

/** Player rank row in sidebar */
function PlayerRow({ name, country, role, rank, rankLabel }) {
  return (
    <GlassCard className="p-4 rounded-xl flex items-center gap-4">
      <div className="w-12 h-12 rounded-full overflow-hidden bg-[#1e2023] flex-shrink-0">
        <div className="w-full h-full bg-[#333538] flex items-center justify-center text-xs font-bold text-[#94d5a5]">
          {name.charAt(0)}
        </div>
      </div>
      <div className="flex-1">
        <p className="font-bold text-sm">{name}</p>
        <p className="text-xs text-[#c0c9bf]">
          {country} • {role}
        </p>
      </div>
      <div className="text-right">
        <p className="text-[#94d5a5] font-bold">{rank}</p>
        <p className="text-[10px] text-[#c0c9bf] uppercase tracking-wider">
          {rankLabel}
        </p>
      </div>
    </GlassCard>
  );
}

/** News article card */
function NewsCard({ category, headline, excerpt, imgPlaceholder }) {
  return (
    <GlassCard className="group overflow-hidden rounded-xl">
      <div className="h-48 overflow-hidden bg-[#1e2023] flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-br from-[#1a1c1f] to-[#333538] flex items-end p-3">
          <span className="text-xs text-[#c0c9bf]">{imgPlaceholder}</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-[#94d5a5] font-bold uppercase mb-1">
          {category}
        </p>
        <h4 className="text-lg font-bold group-hover:text-[#94d5a5] transition-colors mb-2">
          {headline}
        </h4>
        <p className="text-sm text-[#c0c9bf]">{excerpt}</p>
      </div>
    </GlassCard>
  );
}

/** Footer link list */
function FooterLinkGroup({ title, links }) {
  return (
    <div className="space-y-2">
      <h4 className="font-bold text-[#e2e2e6]">{title}</h4>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-sm text-[#c0c9bf] hover:text-[#e2e2e6] transition-colors"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const liveMatches = [
  {
    accentVariant: "t20",
    label: "T20I • 2nd Inning",
    team1: { code: "IND", name: "India", score: "184/4", overs: "18.2" },
    team2: { code: "AUS", name: "Australia", score: "172/7", overs: "20.0" },
    status: { text: "India need 12 runs in 10 balls", highlight: true },
  },
  {
    accentVariant: "test",
    label: "Test • Day 3",
    team1: { code: "ENG", name: "England", score: "245 & 12/0" },
    team2: { code: "RSA", name: "South Africa", score: "310" },
    status: { text: "England trail by 53 runs", highlight: false },
  },
  {
    accentVariant: "t20",
    label: "IPL • League",
    team1: { code: "RCB", name: "RCB", score: "98/2", overs: "11.4" },
    team2: { code: "CSK", name: "CSK", score: "Yet to bat" },
    status: { text: "RCB opt to bat first", highlight: false },
  },
];

const features = [
  {
    icon: Zap,
    iconColor: "text-[#94d5a5]",
    bgColor: "bg-[#94d5a5]/10",
    title: "Real-time Updates",
    description:
      "Instant scores with sub-second latency, faster than your live television broadcast.",
    highlighted: false,
  },
  {
    icon: BarChart2,
    iconColor: "text-[#97d940]",
    bgColor: "bg-[#97d940]/10",
    title: "Ball-by-Ball Analysis",
    description:
      "Granular commentary and tracking for every delivery including speed, trajectory, and turn.",
    highlighted: true,
  },
  {
    icon: BarChart2,
    iconColor: "text-[#ffb3b0]",
    bgColor: "bg-[#ffb3b0]/10",
    title: "Predictive Analytics",
    description:
      "Win probability graphs and AI-driven performance predictions updated after every ball.",
    highlighted: false,
  },
];

const players = [
  { name: "Virat Kohli", country: "India", role: "Batsman", rank: 1, rankLabel: "ODI Rank" },
  { name: "Rashid Khan", country: "AFG", role: "Bowler", rank: 1, rankLabel: "T20 Rank" },
  { name: "Joe Root", country: "ENG", role: "Batsman", rank: 2, rankLabel: "Test Rank" },
];

const newsArticles = [
  {
    category: "International",
    headline: "The Rise of Associate Nations: A New Era?",
    excerpt: "How smaller nations are bridging the gap in world cricket...",
    imgPlaceholder: "Cricket stadium image",
  },
  {
    category: "Analysis",
    headline: "Pitch Report: What to expect in Perth",
    excerpt: "The cracks are showing. Will it favor the seamers or the spinners?",
    imgPlaceholder: "Cricket ball close-up",
  },
];

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function CricPulse() {
  const [scrolled, setScrolled] = useState(false);
  const carouselRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Carousel drag-to-scroll
  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };
  const onMouseLeave = () => (isDragging.current = false);
  const onMouseUp = () => (isDragging.current = false);
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    carouselRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 2;
  };

  const scrollCarousel = (dir) => {
    carouselRef.current.scrollBy({ left: dir * 420, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        body { background-color: #111316; color: #e2e2e6; overflow-x: hidden; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes pulse {
          0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(151,217,64,0.7); }
          70%  { transform: scale(1);    box-shadow: 0 0 0 10px rgba(151,217,64,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(151,217,64,0); }
        }
      `}</style>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 w-full z-50 bg-[#111316]/80 backdrop-blur-xl border-b border-white/10 shadow-sm transition-all duration-300 ${
          scrolled ? "py-2 bg-[#111316]/95" : "h-20"
        }`}
      >
        <nav className="flex justify-between items-center px-6 h-full max-w-[1440px] mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#94d5a5] flex items-center justify-center font-black text-[#00391c] text-lg">
              CP
            </div>
            <span className="text-2xl font-bold text-[#94d5a5]">BoundaryLine</span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6">
            {["Scores", "Schedule", "Teams", "Players", "Rankings", "News"].map(
              (item, i) => (
                <a
                  key={item}
                  href="#"
                  className={`text-base transition-colors ${
                    i === 0
                      ? "text-[#94d5a5] font-bold border-b-2 border-[#94d5a5] pb-1"
                      : "text-[#c0c9bf] hover:text-[#94d5a5]"
                  }`}
                >
                  {item}
                </a>
              )
            )}
          </div>

          {/* Auth */}
          <div className="flex items-center gap-4">
            <button className="text-[#e2e2e6] hover:text-[#94d5a5] transition-colors px-4 py-2 text-base">
              Login
            </button>
            <Button variant="primary" className="text-base px-6 py-2">
              Signup
            </Button>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4">
          <div className="container max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-10 items-center relative z-10">
            {/* Left copy */}
            <div className="text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#94d5a5]/10 border border-[#94d5a5]/20 rounded-full px-4 py-1">
                <LiveDot />
                <span className="text-[#97d940] text-xs font-semibold tracking-widest uppercase">
                  Live: Ind vs Aus 4th Test
                </span>
              </div>

              <h1 className="text-5xl font-extrabold text-[#e2e2e6] max-w-xl leading-tight tracking-tight">
                Never Miss <span className="text-[#94d5a5]">A Ball</span> Again
              </h1>

              <p className="text-lg text-[#c0c9bf] max-w-lg">
                Real-time cricket scores, match analytics, player statistics and
                breaking cricket news delivered at speed.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button variant="primary">
                  View Live Scores <Zap className="w-5 h-5" />
                </Button>
                <Button variant="secondary">Get Started</Button>
              </div>
            </div>

            {/* Right — dashboard mockup */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#94d5a5]/20 blur-3xl rounded-full group-hover:bg-[#94d5a5]/30 transition-all duration-700" />
              <div className="bg-[rgba(30,32,35,0.6)] backdrop-blur-xl border border-white/10 rounded-xl p-4 overflow-hidden relative shadow-2xl">
                {/* Window chrome */}
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-[#ffb4ab]/50" />
                    <div className="w-3 h-3 rounded-full bg-[#97d940]/50" />
                    <div className="w-3 h-3 rounded-full bg-[#94d5a5]/50" />
                  </div>
                  <span className="text-xs text-[#c0c9bf]">Live Insights Hub</span>
                </div>
                {/* Placeholder dashboard */}
                <div className="rounded-lg border border-white/5 bg-[#1a1c1f] h-64 flex items-center justify-center">
                  <div className="text-center space-y-3 px-6">
                    <div className="flex justify-center gap-3">
                      {["IND", "AUS"].map((t) => (
                        <div
                          key={t}
                          className="bg-[#333538] rounded-lg px-4 py-2 text-[#94d5a5] font-bold"
                        >
                          {t}
                        </div>
                      ))}
                    </div>
                    <div className="h-2 w-48 bg-[#94d5a5]/30 rounded-full mx-auto">
                      <div className="h-full w-3/5 bg-[#94d5a5] rounded-full" />
                    </div>
                    <p className="text-xs text-[#c0c9bf]">Win Probability • Live</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Live Matches Carousel ──────────────────────────────────────── */}
        <section className="py-10 bg-[#1a1c1f]/30 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold text-[#e2e2e6]">Live Matches</h2>
              <p className="text-[#c0c9bf] text-base">
                Matches currently in progress worldwide
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="icon" onClick={() => scrollCarousel(-1)}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button variant="icon" onClick={() => scrollCarousel(1)}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto px-6 hide-scrollbar snap-x cursor-grab active:cursor-grabbing"
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
          >
            {liveMatches.map((match, i) => (
              <LiveMatchCard key={i} {...match} />
            ))}
          </div>
        </section>

        {/* ── Upcoming & Recent ──────────────────────────────────────────── */}
        <section className="py-10 max-w-[1440px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Upcoming */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-[#e2e2e6]">Upcoming Matches</h3>
                <a href="#" className="text-[#94d5a5] text-xs font-semibold hover:underline">
                  View All
                </a>
              </div>
              <div className="space-y-4">
                <UpcomingMatchRow day="24" month="Oct" title="NZ vs SL • 1st ODI" venue="Auckland Cricket Ground" />
                <UpcomingMatchRow day="25" month="Oct" title="PAK vs WI • T20I" venue="Gaddafi Stadium" />
              </div>
            </div>

            {/* Recent Results */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-[#e2e2e6]">Recent Results</h3>
                <a href="#" className="text-[#94d5a5] text-xs font-semibold hover:underline">
                  View All
                </a>
              </div>
              <div className="space-y-4">
                <RecentResultRow
                  label="Final • Asia Cup"
                  result="India won by 10 wickets"
                  team1Score="IND 51/0 (6.1)"
                  team2Score="SL 50 (15.2)"
                />
                <RecentResultRow
                  label="3rd Test • Ashes"
                  result="Australia won by 251 runs"
                  team1Score="AUS 484 & 202/6d"
                  team2Score="ENG 374 & 146"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Features Bento ─────────────────────────────────────────────── */}
        <section className="py-10 bg-[#0c0e11]">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#e2e2e6]">Advanced Features</h2>
              <p className="text-[#c0c9bf] max-w-xl mx-auto mt-2">
                Experience the game with depth and detail that standard scorecards simply
                can't match.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <FeatureCard key={i} {...f} />
              ))}
            </div>
          </div>
        </section>

        {/* ── News & Players ─────────────────────────────────────────────── */}
        <section className="py-10 max-w-[1440px] mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* News */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-[#e2e2e6]">Latest News</h2>
                <button className="text-[#c0c9bf] hover:text-[#94d5a5] transition-colors flex items-center gap-1 text-sm">
                  Browse News <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {newsArticles.map((article, i) => (
                  <NewsCard key={i} {...article} />
                ))}
              </div>
            </div>

            {/* Players */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#e2e2e6]">Top Players</h2>
              <div className="space-y-4">
                {players.map((p, i) => (
                  <PlayerRow key={i} {...p} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="w-full py-10 bg-[#0c0e11] border-t border-[#404941]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 max-w-[1440px] mx-auto">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#94d5a5] flex items-center justify-center font-black text-[#00391c] text-sm">
                CP
              </div>
              <span className="text-2xl font-bold text-[#94d5a5]">CricPulse</span>
            </div>
            <p className="text-sm text-[#c0c9bf]">
              The world's most advanced cricket analytics platform. Serving over 10
              million fans globally with real-time data.
            </p>
            <div className="flex gap-4">
              {[Globe, Share2, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-[#c0c9bf] hover:text-[#94d5a5] transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <FooterLinkGroup
            title="Navigation"
            links={["Live Scores", "Schedule", "Rankings", "Series"]}
          />
          <FooterLinkGroup
            title="Resources"
            links={["Stats Hub", "API for Developers", "Newsroom", "Contact Us"]}
          />

          {/* App download */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#e2e2e6]">Get the App</h4>
            <div className="flex flex-col gap-2">
              {[
                { Icon: Smartphone, top: "Download on the", bottom: "App Store" },
                { Icon: BookOpen, top: "Get it on", bottom: "Google Play" },
              ].map(({ Icon, top, bottom }) => (
                <button
                  key={bottom}
                  className="bg-[#333538]/50 p-2 rounded-lg flex items-center gap-4 hover:bg-[#333538] transition-colors"
                >
                  <Icon className="w-8 h-8 text-[#e2e2e6]" />
                  <div className="text-left">
                    <p className="text-[10px] text-[#c0c9bf] uppercase">{top}</p>
                    <p className="text-sm font-bold text-[#e2e2e6]">{bottom}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 text-center px-6">
          <p className="text-sm text-[#97d940]">
            © 2024 CricPulse Analytics. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-2 text-xs text-[#c0c9bf]">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-[#94d5a5] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}