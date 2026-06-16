import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LiveMatchHeader from "../components/LiveMatchHeader.jsx";
import OverTimeline from "../components/OverTimeline.jsx";
import WinProbability from "../components/WinProbabbility.jsx";
import AiInsights from "../components/AiInsights.jsx";
import TopPerformers from "../components/TopPerformers.jsx";
import MatchNews from "../components/MatchNews.jsx";
import socketService from "../../../shared/services/socket/socket.js";
import { SOCKET_EVENTS } from "../../../shared/services/socket/socket-events.js";
import { useSocket } from "../../../shared/services/socket/useSocket.js";
import useScoreSocket from "../hooks/useScoreSocket.js";
import LiveCommentary from "../components/LiveCommentary.jsx";
import {
  addCommentaryRealtime,
  removeCommentaryRealtime,
} from "../../scoreboard/store/mathSlice.js";
import ScorecardTab from "../components/ScorecardTab.jsx";
import PlayingXITab from "../components/PlayingXITab.jsx";

import { ChevronLeft, Share2, Bell, Heart, TrendingUp } from "lucide-react";  


export const ScoreboardPage = () => {
  const dispatch = useDispatch();
  const { joinMatchRoom, leaveMatchRoom } = useSocket();
  const match = useSelector((state) => state.match.currentMatch);
  const activeInnings = match?.innings?.[match?.currentInningsNum - 1];

  // Tab State
  const [activeTab, setActiveTab] = useState("LIVE");

  // Calculate dynamic outputs
  const totalOversPlayed = activeInnings?.overs + activeInnings?.balls / 6;
  const crr =
    totalOversPlayed > 0
      ? (activeInnings?.runs / totalOversPlayed).toFixed(2)
      : "0.00";

  // Standard target checks
  const target = match?.target || 208;
  const runsNeeded = Math.max(0, target - (activeInnings?.runs || 0));
  const totalInningsBalls = 120; // T20 format
  const ballsBowled = (activeInnings?.overs || 0) * 6 + (activeInnings?.balls || 0);
  const ballsRemaining = Math.max(0, totalInningsBalls - ballsBowled);
  const rrr =
    ballsRemaining > 0
      ? ((runsNeeded / ballsRemaining) * 6).toFixed(2)
      : "0.00";

  // Register score socket listeners for this match
  useScoreSocket(match?.id);

  useEffect(() => {
    if (!match?.id) return;

    // Join match room for real-time updates
    joinMatchRoom(match.id);

    // COMMENTARY ADD
    const onCommentaryUpdated = (data) => {
      dispatch(
        addCommentaryRealtime({
          id: data._id,
          over: `${data.over}.${data.ball || 0}`,
          type: data.type,
          title: data.title || data.text,
          description: data.description || data.text,
          timestamp: data.createdAt,
        }),
      );
    };

    // COMMENTARY DELETE
    const onCommentaryDeleted = (data) => {
      dispatch(removeCommentaryRealtime(data.id || data._id));
    };

    socketService.listen(SOCKET_EVENTS.COMMENTARY_UPDATED, onCommentaryUpdated);
    socketService.listen(SOCKET_EVENTS.COMMENTARY_DELETED, onCommentaryDeleted);

    return () => {
      leaveMatchRoom(match.id);
      socketService.removeListener(
        SOCKET_EVENTS.COMMENTARY_UPDATED,
        onCommentaryUpdated,
      );
      socketService.removeListener(
        SOCKET_EVENTS.COMMENTARY_DELETED,
        onCommentaryDeleted,
      );
    };
  }, [match?.id, dispatch, joinMatchRoom, leaveMatchRoom]);

  if (!match || !activeInnings) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen text-white bg-zinc-950 font-sans selection:bg-emerald-500/30">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors duration-150">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              {match.teamA.shortName} vs {match.teamB.shortName}
            </h1>
            <p className="text-[11px] text-zinc-500 font-medium">
              <span className="text-red-500 font-semibold uppercase animate-pulse">
                ● Live
              </span>{" "}
              • T20 • Finals
            </p>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2.5">
          <button className="p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors duration-150 relative">
            <Share2 className="w-4.5 h-4.5" />
          </button>
          <button className="p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors duration-150 relative">
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          </button>
          <button className="p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-rose-500 transition-colors duration-150">
            <Heart className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        {/* Connection diagnostic headers */}
        <LiveMatchHeader />

        {/* Premium Grid Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN: LIVE STATS & INTERACTIVE TAB LOGIC */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* MATCH SUMMARY HERO MODULE */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/90 to-zinc-950/40 border border-white/5 flex flex-col gap-5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex justify-between items-start gap-4 flex-wrap">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono">
                    CURRENT SCORE
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-extrabold text-white tracking-tight">
                      {match.teamA.shortName} {activeInnings?.runs || 0}/
                      {activeInnings?.wickets || 0}
                    </span>
                    <span className="text-sm font-semibold text-zinc-500 font-mono">
                      ({activeInnings?.overs || 0}.{activeInnings?.balls || 0} Overs)
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-amber-400 mt-1 font-sans">
                    Need {runsNeeded} runs in {ballsRemaining} balls
                  </p>
                </div>

                <div className="flex items-start gap-6 font-mono text-right shrink-0">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 block uppercase">
                      CRR
                    </span>
                    <span className="text-lg font-bold text-white mt-1 block">
                      {crr}
                    </span>
                  </div>
                  <div className="h-8 w-[1px] bg-white/10 self-center"></div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 block uppercase">
                      RRR
                    </span>
                    <span className="text-lg font-bold text-emerald-400 mt-1 block">
                      {rrr}
                    </span>
                  </div>
                </div>
              </div>

              {/* Over Ball Timeline Row */}
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 mt-2 shadow-inner">
                <OverTimeline
                  balls={match?.thisOver}
                  maxDisplay={7}
                  label="THIS OVER"
                />
              </div>
            </div>

            {/* LOWER LEFT SUB-MODULE PANEL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WinProbability
                teamAName={match.teamA.shortName}
                teamBName={match.teamB.shortName}
                teamAPct={match.winProbability.teamA}
                teamBPct={match.winProbability.teamB}
                trendText={match.winProbability.trend}
              />
              <AiInsights />
            </div>

            {/* TAB SELECTOR HEADER */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-white/5 scrollbar-none">
                {["LIVE", "SCORECARD", "COMMENTARY", "STATS", "PLAYING_XI"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase shrink-0 transition-all duration-200 ${
                        activeTab === tab
                          ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {tab.replace("_", " ")}
                    </button>
                  ),
                )}
              </div>

              {/* TAB CONTAINER */}
              <div className="mt-2 min-h-[300px]">
                {(activeTab === "LIVE" || activeTab === "COMMENTARY") && (
                  <LiveCommentary />
                )}
                {activeTab === "SCORECARD" && <ScorecardTab />}
                {activeTab === "PLAYING_XI" && <PlayingXITab />}
                {activeTab === "STATS" && (
                  <div className="p-8 rounded-xl bg-zinc-950/40 border border-white/5 flex flex-col items-center justify-center text-center gap-3">
                    <TrendingUp className="w-8 h-8 text-emerald-400" />
                    <h4 className="text-base font-semibold text-white">
                      Full-Innings Statistics
                    </h4>
                    <p className="text-xs text-zinc-500 max-w-sm">
                      Deep match analytics, partnership flows, wagon wheels and
                      spray chart projections are updated after the first
                      innings settles.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PERFORMANCES & AUXILIARY METRICS */}
          <div className="flex flex-col gap-6">
            <TopPerformers />
            <MatchNews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreboardPage;