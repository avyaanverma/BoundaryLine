import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import LiveMatchHeader from "../components/LiveMatchheader.jsx";
import OverTimeline from "../components/OverTimeline.jsx";
import WinProbability from "../components/WinProbabbility.jsx";
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
import {
  useLiveMatchQuery,
  useMatchScoresQuery,
  useCommentaryQuery,
} from "../../../shared/hooks/useQueries.js";
import { ChevronLeft, Share2, Bell, Heart, TrendingUp, Loader2, AlertCircle, Trophy } from "lucide-react";

/**
 * Compute 'this over' balls from the last 6 commentary entries
 * that belong to the most recent (highest) over number.
 */
const computeThisOver = (commentaryEntries) => {
  if (!commentaryEntries || commentaryEntries.length === 0) return [];

  // Commentary comes sorted newest-first from API.
  // Find the highest over number from the latest entries.
  const latestOver = commentaryEntries[0]?.over;
  if (latestOver === undefined) return [];

  // Filter all entries from this over, reverse to chronological order
  const entriesForOver = commentaryEntries
    .filter((c) => c.over === latestOver)
    .reverse();

  // Map to ball representation: runs, W for wicket, WD/NB for extras
  return entriesForOver.map((c) => {
    if (c.type === "WICKET") return "W";
    if (!c.isLegalDelivery) {
      if (c.extraRuns > 0) return `WD+${c.extraRuns}`;
      return "WD";
    }
    if (c.runsScored === 6) return "6";
    if (c.runsScored === 4) return "4";
    if (c.runsScored === 0) return "0";
    return String(c.runsScored);
  });
};

/**
 * Map backend innings index (0, 1) to a readable label.
 */
const inningsLabel = (idx) => {
  if (idx === 0) return "Innings 1";
  if (idx === 1) return "Innings 2";
  return `Innings ${idx + 1}`;
};

export const ScoreboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { matchId } = useParams();
  const { joinMatchRoom, leaveMatchRoom } = useSocket();

  // ─── Data fetching ───
  const { data: backendMatch, isLoading, isError } = useLiveMatchQuery(matchId, {
    enabled: !!matchId,
  });

  const {
    data: scores = [],
    isLoading: scoresLoading,
  } = useMatchScoresQuery(matchId);

  const {
    data: commentaryEntries = [],
    isLoading: commentaryLoading,
  } = useCommentaryQuery(matchId);

  // ─── Redux match state ───
  const reduxMatch = useSelector((state) => state.match.currentMatch);

  // ─── Determine display match ───
  const displayMatch = (matchId && backendMatch)
    ? backendMatch
    : (reduxMatch && reduxMatch.id ? reduxMatch : null);

  // Normalize team references
  const match = displayMatch ? {
    ...displayMatch,
    teamA: displayMatch.teamA || displayMatch.team1 || { id: "", name: "", shortName: "" },
    teamB: displayMatch.teamB || displayMatch.team2 || { id: "", name: "", shortName: "" },
    team1: displayMatch.team1 || displayMatch.teamA || { _id: "", name: "", shortName: "" },
    team2: displayMatch.team2 || displayMatch.teamB || { _id: "", name: "", shortName: "" },
  } : null;

  const [activeTab, setActiveTab] = useState("LIVE");

  // ─── Compute innings data from scores ───
  // Backend Score model: { matchId, innings, battingTeam, score, wickets, overs, runRate, target }
  // innings=1 is first batting, innings=2 is second batting
  const innings1 = useMemo(() => scores.find((s) => s.innings === 1), [scores]);
  const innings2 = useMemo(() => scores.find((s) => s.innings === 2), [scores]);
const latestScore = useMemo(() => {
  if (!scores.length) return null;

  // Use timestamps (updatedAt or createdAt) to find the most recently updated score,
  // instead of sorting by overs which is wrong across multiple innings.
  return scores.reduce((latest, current) => {
    const latestTime = new Date(latest.updatedAt || latest.createdAt).getTime();
    const currentTime = new Date(current.updatedAt || current.createdAt).getTime();

    return currentTime > latestTime ? current : latest;
  });
}, [scores]);

  // Determine which innings is currently active
  const activeInnings = useMemo(() => {
    if (!latestScore) {
      return { runs: 0, wickets: 0, overs: 0, balls: 0 };
    }
    const oversStr = latestScore.overs || "0.0";
    const parts = oversStr.split(".");
    return {
      runs: latestScore.score || 0,
      wickets: latestScore.wickets || 0,
      overs: Number(parts[0]) || 0,
      balls: Number(parts[1]) || 0,
      target: latestScore.target || undefined,
    };
  }, [latestScore]);

  // ─── Debug: log raw scores to verify data from backend ───
  useEffect(() => {
    console.log("scores", scores);
    console.log("innings1", innings1);
    console.log("latestScore", latestScore);
    console.log("activeInnings", activeInnings);
  }, [scores, innings1, latestScore, activeInnings]);

  // ─── Compute derived stats ───
  const totalOversPlayed = (activeInnings?.overs || 0) + (activeInnings?.balls || 0) / 6;
  const crr = totalOversPlayed > 0
    ? (activeInnings.runs / totalOversPlayed).toFixed(2)
    : "0.00";

  const target = activeInnings?.target || match?.target || 0;
  const isSecondInnings = !!innings1 && !!(scores.find(s => s.innings === 2));
  const runsNeeded = isSecondInnings ? Math.max(0, (innings1?.score || 0) + 1 - (activeInnings?.runs || 0)) : 0;
  const totalBallsPerInnings = 120; // T20
  const ballsBowled = ((activeInnings?.overs || 0) * 6) + (activeInnings?.balls || 0);
  const ballsRemaining = Math.max(0, totalBallsPerInnings - ballsBowled);
  const rrr = ballsRemaining > 0 && runsNeeded > 0
    ? ((runsNeeded / ballsRemaining) * 6).toFixed(2)
    : "0.00";

  // ─── Compute 'this over' from commentary ───
  const thisOver = useMemo(() => computeThisOver(commentaryEntries), [commentaryEntries]);

  // ─── Compute win probability from scores ───
  const winProb = useMemo(() => {
    if (!innings1) return { teamA: 50, teamB: 50, trend: "Match not started." };

    const firstInningsScore = innings1.score || 0;
    const firstInningsOvers = parseFloat(innings1.overs || "0") || 1;
    const firstInningsRR = firstInningsScore / firstInningsOvers;

    if (!innings2) {
      // Only one innings completed — team batting first is ahead
      const runsAbovePar = Math.min(40, Math.max(-40, (activeInnings.runs - firstInningsScore * (ballsBowled / 240))));
      const battingFirstProb = 50 + runsAbovePar * 0.8;
      return {
        teamA: Math.round(Math.min(90, Math.max(10, battingFirstProb))),
        teamB: 100 - Math.round(Math.min(90, Math.max(10, battingFirstProb))),
        trend: `${match?.teamA?.shortName || "Team1"} batting first.`,
      };
    }

    // Second innings in progress
    const target2 = firstInningsScore + 1;
    const runsLeft = target2 - activeInnings.runs;
    const ballsLeft = totalBallsPerInnings - ballsBowled;
    const requiredRR = ballsLeft > 0 ? (runsLeft / ballsLeft) * 6 : 0;
    const chasingProb = requiredRR > 0
      ? Math.round(Math.min(90, Math.max(10, (firstInningsRR / (firstInningsRR + requiredRR)) * 100)))
      : 50;

    return {
      teamA: Math.round(chasingProb),
      teamB: 100 - Math.round(chasingProb),
      trend: `Target: ${target2} runs. Need ${runsLeft} from ${ballsLeft} balls (RRR: ${requiredRR.toFixed(2)}).`,
    };
  }, [innings1, innings2, activeInnings, ballsBowled, match]);

  // ─── Socket listeners ───
  useScoreSocket(match?.id);

  useEffect(() => {
    if (!match?.id) return;

    socketService.connect();
    joinMatchRoom(match.id);

    const onCommentaryUpdated = (data) => {
      dispatch(addCommentaryRealtime({
        id: data._id,
        over: `${data.over}.${data.ball || 0}`,
        type: data.type,
        title: data.title || data.text,
        description: data.description || data.text,
        timestamp: data.createdAt,
      }));
    };
    const onCommentaryDeleted = (data) => {
      dispatch(removeCommentaryRealtime(data.id || data._id));
    };

    socketService.listen(SOCKET_EVENTS.COMMENTARY_CREATED, onCommentaryUpdated);
    socketService.listen(SOCKET_EVENTS.COMMENTARY_DELETED, onCommentaryDeleted);

    return () => {
      leaveMatchRoom(match.id);
      socketService.removeListener(SOCKET_EVENTS.COMMENTARY_CREATED, onCommentaryUpdated);
      socketService.removeListener(SOCKET_EVENTS.COMMENTARY_DELETED, onCommentaryDeleted);
    };
  }, [match?.id, dispatch, joinMatchRoom, leaveMatchRoom]);

  // ─── Loading states ───
  if (scoresLoading && !latestScore && matchId) {
    return (
      <div className="flex flex-col min-h-screen text-white bg-zinc-950 items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
        <p className="text-sm text-zinc-400">Loading score...</p>
      </div>
    );
  }

  if (isLoading && !match) {
    return (
      <div className="flex flex-col min-h-screen text-white bg-zinc-950 items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
        <p className="text-sm text-zinc-400 font-semibold">Loading match data...</p>
      </div>
    );
  }

  if (isError && !match) {
    return (
      <div className="flex flex-col min-h-screen text-white bg-zinc-950 items-center justify-center gap-4 p-8">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <p className="text-red-400 text-sm font-semibold">Failed to load match</p>
        <p className="text-xs text-zinc-500">Match not found or server unavailable.</p>
        <button onClick={() => navigate("/matches")} className="px-4 py-2 rounded-xl bg-emerald-600 text-black text-xs font-bold hover:bg-emerald-500 transition-all">Back to Matches</button>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="flex flex-col min-h-screen text-white bg-zinc-950 items-center justify-center gap-4">
        <Trophy className="w-10 h-10 text-zinc-600" />
        <p className="text-sm text-zinc-400 font-semibold">No match selected</p>
        <p className="text-xs text-zinc-500">Select a match from the dropdown above or browse from{" "}
          <button onClick={() => navigate("/matches")} className="text-emerald-400 hover:underline font-semibold">/matches</button>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen text-white bg-zinc-950 font-sans selection:bg-emerald-500/30">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/matches")} className="p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
            <ChevronLeft 
              className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              {match.teamA.shortName} vs {match.teamB.shortName}
            </h1>
            <p className="text-[11px] text-zinc-500 font-medium">
              <span className="text-red-500 font-semibold uppercase animate-pulse">● {match.status || "LIVE"}</span> • {match.series || "T20"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors relative">
            <Share2 className="w-4.5 h-4.5" />
          </button>
          <button className="p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors relative">
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          </button>
          <button className="p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-rose-500 transition-colors">
            <Heart className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        <LiveMatchHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* MATCH SUMMARY HERO */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/90 to-zinc-950/40 border border-white/5 flex flex-col gap-5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex justify-between items-start gap-4 flex-wrap">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono">CURRENT SCORE</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-extrabold text-white tracking-tight">
                      {match.teamA.shortName} {activeInnings?.runs || 0}/{activeInnings?.wickets || 0}
                    </span>
                    <span className="text-sm font-semibold text-zinc-500 font-mono">
                      ({activeInnings?.overs || 0}.{activeInnings?.balls || 0} Overs)
                    </span>
                  </div>
                  {runsNeeded > 0 && (
                    <p className="text-sm font-semibold text-amber-400 mt-1 font-sans">Need {runsNeeded} runs in {ballsRemaining} balls</p>
                  )}
                </div>

                <div className="flex items-start gap-6 font-mono text-right shrink-0">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 block uppercase">CRR</span>
                    <span className="text-lg font-bold text-white mt-1 block">{crr}</span>
                  </div>
                  <div className="h-8 w-[1px] bg-white/10 self-center"></div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 block uppercase">RRR</span>
                    <span className="text-lg font-bold text-emerald-400 mt-1 block">{rrr}</span>
                  </div>
                </div>
              </div>

              {/* Over Ball Timeline — computed from backend commentary */}
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 mt-2 shadow-inner">
                <OverTimeline balls={thisOver} maxDisplay={7} label="THIS OVER" />
              </div>
            </div>

            {/* Win Probability & Innings Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WinProbability
                teamAName={match.teamA.shortName}
                teamBName={match.teamB.shortName}
                teamAPct={winProb.teamA}
                teamBPct={winProb.teamB}
                trendText={winProb.trend}
              />

              {/* Innings Summary Cards — shows all innings from backend scores */}
              <div className="flex flex-col gap-3">
                {[innings1, innings2].filter(Boolean).map((inn, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-zinc-950/40 border border-white/5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-white">{inningsLabel(idx)}</span>
                      <span className="font-mono font-bold text-emerald-400">
                        {inn.score}/{inn.wickets || 0}
                        <span className="text-zinc-500 text-xs ml-1">({inn.overs || "0.0"} Ov)</span>
                      </span>
                    </div>
                    {inn.runRate > 0 && (
                      <p className="text-[11px] text-zinc-500 mt-1">Run Rate: {inn.runRate.toFixed(2)}</p>
                    )}
                  </div>
                ))}
                {!innings1 && !innings2 && (
                  <div className="p-4 rounded-xl bg-zinc-950/40 border border-white/5 flex items-center justify-center text-xs text-zinc-500">
                    No scores yet
                  </div>
                )}
              </div>
            </div>

            {/* TABS */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-white/5 scrollbar-none">
                {["LIVE", "SCORECARD", "COMMENTARY", "STATS", "PLAYING_XI"].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase shrink-0 transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}>
                    {tab.replace("_", " ")}
                  </button>
                ))}
              </div>

              <div className="mt-2 min-h-[300px]">
                {(activeTab === "LIVE" || activeTab === "COMMENTARY") && (
                  <LiveCommentary externalCommentary={commentaryEntries} />
                )}
                {activeTab === "SCORECARD" && (
                  <ScorecardTab
                    externalScores={scores}
                    externalMatch={match}
                  />
                )}
                {activeTab === "PLAYING_XI" && <PlayingXITab />}
                {activeTab === "STATS" && (
                  <div className="p-8 rounded-xl bg-zinc-950/40 border border-white/5 flex flex-col items-center justify-center text-center gap-3">
                    <TrendingUp className="w-8 h-8 text-emerald-400" />
                    <h4 className="text-base font-semibold text-white">Full-Innings Statistics</h4>
                    <p className="text-xs text-zinc-500 max-w-sm">
                      Deep match analytics, partnership flows, wagon wheels and
                      spray chart projections are updated after the first innings settles.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            <TopPerformers scores={scores} match={match} />
            <MatchNews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreboardPage;
