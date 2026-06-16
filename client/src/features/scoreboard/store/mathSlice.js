import { createSlice } from "@reduxjs/toolkit";

/**
 * Default empty match template used for initialization.
 * When the user selects a backend match via loadExternalMatch,
 * this gets replaced with real data.
 */
const EMPTY_MATCH = {
  id: "",
  title: "",
  subtitle: "",
  status: "UPCOMING",
  matchPhase: "SETUP",
  teamA: { id: "", name: "", shortName: "" },
  teamB: { id: "", name: "", shortName: "" },
  currentInningsNum: 1,
  innings: [
    {
      teamId: "",
      teamName: "",
      runs: 0,
      wickets: 0,
      overs: 0,
      balls: 0,
      extras: { wides: 0, noBalls: 0, byes: 0, legByes: 0, total: 0 },
      batters: [],
      bowlers: [],
    },
    {
      teamId: "",
      teamName: "",
      runs: 0,
      wickets: 0,
      overs: 0,
      balls: 0,
      extras: { wides: 0, noBalls: 0, byes: 0, legByes: 0, total: 0 },
      batters: [],
      bowlers: [],
    },
  ],
  activeBatter1Id: "",
  activeBatter2Id: "",
  activeBowlerId: "",
  target: 0,
  thisOver: [],
  commentary: [],
  winProbability: {
    teamA: 50,
    teamB: 50,
    trend: "Match balanced at start.",
  },
  aiInsights: [],
  fow: [],
};

const initialState = {
  matchesList: [],
  currentMatch: { ...EMPTY_MATCH },
  activeMatchId: "",
  history: [],
  isSynced: true,
  statusMessage: "No match loaded. Select or create a match to begin.",
  rosters: {},
};

const updateMatchesList = (state) => {
  const idx = state.matchesList.findIndex((m) => m.id === state.activeMatchId);
  if (idx !== -1) {
    state.matchesList[idx] = state.currentMatch;
  }
};

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    /**
     * Load a backend match document into Redux scoring-compatible state.
     * Called when user selects a match from the backend API in SetupWizard.
     */
    loadExternalMatch: (state, action) => {
      const { match } = action.payload;
      if (!match) return;

      const team1 = match.team1 || match.teamA || {};
      const team2 = match.team2 || match.teamB || {};
      const matchId = match._id || match.id || "";

      const newMatch = {
        id: matchId,
        _id: matchId,
        title: `${team1.shortName || "T1"} vs ${team2.shortName || "T2"}`,
        subtitle: match.venue || match.subtitle || `${match.series || "Match"}`,
        status: match.status || "UPCOMING",
        matchPhase: "SETUP",
        teamA: {
          id: team1._id || team1.id || "",
          name: team1.name || team1.shortName || "Team A",
          shortName: team1.shortName || (team1.name ? team1.name.substring(0, 3).toUpperCase() : "T1"),
        },
        teamB: {
          id: team2._id || team2.id || "",
          name: team2.name || team2.shortName || "Team B",
          shortName: team2.shortName || (team2.name ? team2.name.substring(0, 3).toUpperCase() : "T2"),
        },
        currentInningsNum: 1,
        innings: [
          {
            teamId: team1._id || team1.id || "",
            teamName: team1.name || team1.shortName || "Team A",
            runs: 0,
            wickets: 0,
            overs: 0,
            balls: 0,
            extras: { wides: 0, noBalls: 0, byes: 0, legByes: 0, total: 0 },
            batters: [],
            bowlers: [],
          },
          {
            teamId: team2._id || team2.id || "",
            teamName: team2.name || team2.shortName || "Team B",
            runs: 0,
            wickets: 0,
            overs: 0,
            balls: 0,
            extras: { wides: 0, noBalls: 0, byes: 0, legByes: 0, total: 0 },
            batters: [],
            bowlers: [],
          },
        ],
        activeBatter1Id: "",
        activeBatter2Id: "",
        activeBowlerId: "",
        target: 0,
        thisOver: [],
        commentary: [],
        winProbability: { teamA: 50, teamB: 50, trend: "Match balanced at start." },
        aiInsights: [],
        fow: [],
      };

      // Add to matchesList if not already present
      const exists = state.matchesList.some((m) => m.id === matchId);
      if (!exists) {
        state.matchesList.push(newMatch);
      }

      state.activeMatchId = matchId;
      state.currentMatch = newMatch;
      state.history = [];
      state.isSynced = true;
      state.statusMessage = "Match loaded from backend. Proceed with setup.";
    },

    setActiveMatch: (state, action) => {
      state.history = [];
      state.activeMatchId = action.payload;
      const targetMatch = state.matchesList.find(
        (m) => m.id === action.payload,
      );
      if (targetMatch) {
        state.currentMatch = targetMatch;
      }
      state.isSynced = true;
    },

    createDynamicMatch: (state, action) => {
      const { id, title, subtitle, teamAName, teamBName } = action.payload;
      const teamAShort = (teamAName || "TMA").substring(0, 3).toUpperCase();
      const teamBShort = (teamBName || "TMB").substring(0, 3).toUpperCase();
      const teamAId = `team-${Date.now()}-A`;
      const teamBId = `team-${Date.now()}-B`;

      const newMatch = {
        id,
        title,
        subtitle: subtitle || "LIVE • T20 Finals",
        status: "LIVE",
        matchPhase: "SETUP",
        teamA: { id: teamAId, name: teamAName, shortName: teamAShort },
        teamB: { id: teamBId, name: teamBName, shortName: teamBShort },
        currentInningsNum: 1,
        innings: [
          {
            teamId: teamAId,
            teamName: teamAName,
            runs: 0,
            wickets: 0,
            overs: 0,
            balls: 0,
            extras: { wides: 0, noBalls: 0, byes: 0, legByes: 0, total: 0 },
            batters: [],
            bowlers: [],
          },
          {
            teamId: teamBId,
            teamName: teamBName,
            runs: 0,
            wickets: 0,
            overs: 0,
            balls: 0,
            extras: { wides: 0, noBalls: 0, byes: 0, legByes: 0, total: 0 },
            batters: [],
            bowlers: [],
          },
        ],
        activeBatter1Id: "",
        activeBatter2Id: "",
        activeBowlerId: "",
        thisOver: [],
        commentary: [],
        winProbability: {
          teamA: 50,
          teamB: 50,
          trend: "Match balanced equally at start of play.",
        },
        aiInsights: [],
        fow: [],
      };

      state.matchesList.push(newMatch);
      state.activeMatchId = id;
      state.currentMatch = newMatch;
      state.history = [];
      state.isSynced = true;

      if (!state.rosters[teamAId]) {
        state.rosters[teamAId] = [];
      }
      if (!state.rosters[teamBId]) {
        state.rosters[teamBId] = [];
      }
    },

    addPlayerToRoster: (state, action) => {
      const { teamId, player } = action.payload;
      if (!state.rosters[teamId]) {
        state.rosters[teamId] = [];
      }
      if (!state.rosters[teamId].some((p) => p.id === player.id)) {
        state.rosters[teamId].push(player);
      }
    },

    bulkAddPlayersToRoster: (state, action) => {
      const { teamId, players } = action.payload;
      if (!state.rosters[teamId]) {
        state.rosters[teamId] = [];
      }
      players.forEach((p) => {
        if (!state.rosters[teamId].some((old) => old.id === p.id)) {
          state.rosters[teamId].push(p);
        }
      });
    },

    saveToHistory: (state) => {
      state.history.push(JSON.parse(JSON.stringify(state.currentMatch)));
      if (state.history.length > 15) {
        state.history.shift();
      }
      state.isSynced = false;
      updateMatchesList(state);
    },

    undoScore: (state) => {
      if (state.history.length > 0) {
        state.currentMatch = state.history.pop();
        state.isSynced = false;
        updateMatchesList(state);
      }
    },

    dismissBanner: (state) => {
      if (state.currentMatch) {
        state.currentMatch.showDismissalBanner = false;
        updateMatchesList(state);
      }
    },

    startMatchSetup: (state, action) => {
      const {
        tossWinner,
        tossDecision,
        teamA_XI,
        teamB_XI,
        strikerId,
        nonStrikerId,
        bowlerId,
      } = action.payload;
      const match = state.currentMatch;
      if (!match || !match.teamA) return;

      state.history.push(JSON.parse(JSON.stringify(match)));
      state.isSynced = false;

      match.matchPhase = "LIVE";
      match.matchEvent = "POWERPLAY";
      match.tossWinner = tossWinner;
      match.battingFirst =
        tossDecision === "BAT"
          ? tossWinner
          : tossWinner === match.teamA.name
            ? match.teamB.name
            : match.teamA.name;

      const battingTeamId =
        match.battingFirst === match.teamA.name
          ? match.teamA.id
          : match.teamB.id;
      const bowlingTeamId =
        battingTeamId === match.teamA.id ? match.teamB.id : match.teamA.id;

      const activeBatters = (
        match.battingFirst === match.teamA.name ? teamA_XI : teamB_XI
      ).map((p) => ({
        playerId: p.id,
        name: p.name,
        role: p.role,
        battingStats: { runs: 0, balls: 0, fours: 0, sixes: 0, isOut: false },
      }));

      const activeBowlers = (
        match.battingFirst === match.teamA.name ? teamB_XI : teamA_XI
      ).map((p) => ({
        playerId: p.id,
        name: p.name,
        role: p.role,
        bowlingStats: { overs: 0, balls: 0, maidens: 0, runsConceded: 0, wickets: 0 },
      }));

      match.currentInningsNum = 1;
      match.innings[0] = {
        teamId: battingTeamId,
        teamName: match.battingFirst,
        runs: 0,
        wickets: 0,
        overs: 0,
        balls: 0,
        extras: { wides: 0, noBalls: 0, byes: 0, legByes: 0, total: 0 },
        batters: activeBatters,
        bowlers: activeBowlers,
      };

      match.innings[1] = {
        teamId: bowlingTeamId,
        teamName: match.battingFirst === match.teamA.name ? match.teamB.name : match.teamA.name,
        runs: 0,
        wickets: 0,
        overs: 0,
        balls: 0,
        extras: { wides: 0, noBalls: 0, byes: 0, legByes: 0, total: 0 },
        batters: (match.battingFirst === match.teamA.name ? teamB_XI : teamA_XI).map((p) => ({
          playerId: p.id,
          name: p.name,
          role: p.role,
          battingStats: { runs: 0, balls: 0, fours: 0, sixes: 0, isOut: false },
        })),
        bowlers: (match.battingFirst === match.teamA.name ? teamA_XI : teamB_XI).map((p) => ({
          playerId: p.id,
          name: p.name,
          role: p.role,
          bowlingStats: { overs: 0, balls: 0, maidens: 0, runsConceded: 0, wickets: 0 },
        })),
      };

      match.activeBatter1Id = strikerId;
      match.activeBatter2Id = nonStrikerId;
      match.activeBowlerId = bowlerId;
      match.thisOver = [];
      match.fow = [];
      match.lastDismissalEvent = undefined;
      match.showDismissalBanner = false;

      match.commentary = [
        {
          id: `c-start-${Date.now()}`,
          over: "0.0",
          type: "MILESTONE",
          title: "Match Commenced!",
          description: `${tossWinner} won the toss and elected to ${tossDecision.toLowerCase()} first.`,
          timestamp: new Date().toISOString(),
        },
      ];

      match.winProbability = { teamA: 50, teamB: 50, trend: "Match started." };
      updateMatchesList(state);
    },

    swapStrike: (state) => {
      if (!state.currentMatch) return;
      state.history.push(JSON.parse(JSON.stringify(state.currentMatch)));
      const temp = state.currentMatch.activeBatter1Id;
      state.currentMatch.activeBatter1Id = state.currentMatch.activeBatter2Id;
      state.currentMatch.activeBatter2Id = temp;
      state.isSynced = false;
      updateMatchesList(state);
    },

    changeBowler: (state, action) => {
      const match = state.currentMatch;
      if (!match) return;
      const activeInnings = match.innings?.[match.currentInningsNum - 1];
      if (!activeInnings) return;

      state.history.push(JSON.parse(JSON.stringify(match)));
      match.activeBowlerId = action.payload.bowlerId;

      const targetBowler = activeInnings.bowlers?.find(
        (b) => b.playerId === action.payload.bowlerId,
      );
      if (targetBowler && !targetBowler.bowlingStats) {
        targetBowler.bowlingStats = { overs: 0, balls: 0, maidens: 0, runsConceded: 0, wickets: 0 };
      }
      match.matchEvent = "NORMAL";
      state.isSynced = false;
      updateMatchesList(state);
    },

    triggerMatchFlowEvent: (state, action) => {
      if (!state.currentMatch) return;
      state.history.push(JSON.parse(JSON.stringify(state.currentMatch)));
      state.currentMatch.matchEvent = action.payload;
      state.isSynced = false;
      updateMatchesList(state);
    },

    commitWicketState: (state, action) => {
      const match = state.currentMatch;
      if (!match) return;
      const activeInnings = match.innings?.[match.currentInningsNum - 1];
      if (!activeInnings) return;

      const { dismissalType, outBatterId, newBatterId, fielderId, bowlerId, keeperId } = action.payload;

      state.history.push(JSON.parse(JSON.stringify(match)));
      state.isSynced = false;

      const outBatter = activeInnings.batters?.find((b) => b.playerId === outBatterId);
      const activeBowler = activeInnings.bowlers?.find((b) => b.playerId === match.activeBowlerId);
      const bowlerName = activeBowler?.name || "Bowler";

      let notation, detailDesc;

      switch (dismissalType) {
        case "BOWLED": notation = `b ${bowlerName}`; detailDesc = "BOWLED!"; break;
        case "CAUGHT": {
          const fielderName = fielderId
            ? activeInnings.bowlers?.find((b) => b.playerId === fielderId)?.name ||
              activeInnings.batters?.find((b) => b.playerId === fielderId)?.name || ""
            : "";
          notation = fielderName ? `c ${fielderName} b ${bowlerName}` : `c & b ${bowlerName}`;
          detailDesc = "CAUGHT!";
          break;
        }
        case "LBW": notation = `lbw b ${bowlerName}`; detailDesc = "LBW!"; break;
        case "RUN_OUT": {
          const fielderNameRun = fielderId
            ? activeInnings.bowlers?.find((b) => b.playerId === fielderId)?.name ||
              activeInnings.batters?.find((b) => b.playerId === fielderId)?.name || ""
            : "";
          notation = fielderNameRun ? `run out (${fielderNameRun})` : "run out";
          detailDesc = "RUN OUT!";
          break;
        }
        case "STUMPED":
          notation = keeperId
            ? `st ${activeInnings.bowlers?.find((b) => b.playerId === keeperId)?.name || "Keeper"} b ${bowlerName}`
            : `stumped b ${bowlerName}`;
          detailDesc = "STUMPED!";
          break;
        case "HIT_WICKET": notation = `hit wicket b ${bowlerName}`; detailDesc = "HIT WICKET!"; break;
        default: notation = `out b ${bowlerName}`; detailDesc = "OUT!";
      }

      if (outBatter?.battingStats) {
        outBatter.battingStats.isOut = true;
        outBatter.battingStats.howOut = notation;
        outBatter.battingStats.balls += 1;
      }

      activeInnings.wickets += 1;
      const currentOverStr = `${activeInnings.overs}.${activeInnings.balls + 1}`;
      match.fow.push({
        batterName: outBatter?.name || "Batter",
        runs: activeInnings.runs,
        wickets: activeInnings.wickets,
        over: currentOverStr,
        detail: notation,
      });

      const isBowlerWicket = ["BOWLED","CAUGHT","LBW","STUMPED","HIT_WICKET"].includes(dismissalType);
      if (isBowlerWicket && activeBowler?.bowlingStats) {
        activeBowler.bowlingStats.wickets += 1;
        activeBowler.bowlingStats.balls += 1;
        if (activeBowler.bowlingStats.balls >= 6) {
          activeBowler.bowlingStats.overs += 1;
          activeBowler.bowlingStats.balls = 0;
        }
      }

      activeInnings.balls += 1;
      if (activeInnings.balls >= 6) {
        activeInnings.overs += 1;
        activeInnings.balls = 0;
        match.matchEvent = "END_OVER";
      }

      if (match.thisOver.length >= 7) match.thisOver.shift();
      match.thisOver.push("W");

      match.lastDismissalEvent = {
        batterName: outBatter?.name || "Batter",
        runs: outBatter?.battingStats?.runs || 0,
        balls: outBatter?.battingStats?.balls || 0,
        detail: notation,
      };
      match.showDismissalBanner = true;

      match.commentary.unshift({
        id: `c-wkt-${Date.now()}`,
        over: currentOverStr,
        type: "WICKET",
        title: `OUT! ${outBatter?.name || "Batter"} Dismissed`,
        description: `OUT! ${outBatter?.name} ${notation}. (${outBatter?.battingStats?.runs || 0} runs)`,
        timestamp: new Date().toISOString(),
      });

      if (newBatterId) {
        if (match.activeBatter1Id === outBatterId) match.activeBatter1Id = newBatterId;
        else match.activeBatter2Id = newBatterId;
      }

      match.winProbability.teamA = Math.max(10, Math.min(90, match.winProbability.teamA - 15));
      match.winProbability.teamB = 100 - match.winProbability.teamA;
      match.winProbability.trend = `Wicket fell on ${currentOverStr}.`;

      updateMatchesList(state);
    },

    updateBallEvent: (state, action) => {
      const { type, runs, extraRuns = 0 } = action.payload;
      const match = state.currentMatch;
      if (!match) return;
      const activeInnings = match.innings?.[match.currentInningsNum - 1];
      if (!activeInnings) return;

      state.history.push(JSON.parse(JSON.stringify(match)));
      state.isSynced = false;

      let ballRepresentative = "";
      let isBallValid = true;
      let runsToAdding = runs;
      let extrasToAdding = 0;

      switch (type) {
        case "RUN": ballRepresentative = runs === 0 ? "0" : runs.toString(); break;
        case "WD": ballRepresentative = "WD"; isBallValid = false; runsToAdding = 0; extrasToAdding = 1 + extraRuns; activeInnings.extras.wides += extrasToAdding; break;
        case "NB": ballRepresentative = "NB"; isBallValid = false; extrasToAdding = 1; activeInnings.extras.noBalls += 1; break;
        case "WD_RUNS": ballRepresentative = `WD+${extraRuns}`; isBallValid = false; runsToAdding = 0; extrasToAdding = 1 + extraRuns; activeInnings.extras.wides += extrasToAdding; break;
        case "NB_RUNS": ballRepresentative = `NB+${runs}`; isBallValid = false; extrasToAdding = 1; activeInnings.extras.noBalls += 1; break;
        case "BYE": ballRepresentative = `B${runs}`; runsToAdding = 0; extrasToAdding = runs; activeInnings.extras.byes += runs; break;
        case "LB": ballRepresentative = `L${runs}`; runsToAdding = 0; extrasToAdding = runs; activeInnings.extras.legByes += runs; break;
        case "WICKET": ballRepresentative = "W"; break;
        case "CUSTOM": ballRepresentative = action.payload.customLabel || "?"; break;
        default: ballRepresentative = runs.toString(); break;
      }

      const runsIncurred = runsToAdding + extrasToAdding;
      activeInnings.runs += runsIncurred;

      let justCompletedOver = false;
      if (isBallValid) {
        activeInnings.balls += 1;
        if (activeInnings.balls >= 6) {
          activeInnings.overs += 1;
          activeInnings.balls = 0;
          justCompletedOver = true;
          match.matchEvent = "END_OVER";
        }
      }

      if (match.thisOver.length >= 7) match.thisOver.shift();
      match.thisOver.push(ballRepresentative);

      // Update striker stats
      const striker = activeInnings.batters?.find((b) => b.playerId === match.activeBatter1Id);
      if (striker) {
        if (!striker.battingStats) striker.battingStats = { runs: 0, balls: 0, fours: 0, sixes: 0, isOut: false };
        if (type === "RUN" || type === "NB" || type === "NB_RUNS") striker.battingStats.runs += runsToAdding;
        if (type !== "WD" && type !== "WD_RUNS") striker.battingStats.balls += 1;
        if (runsToAdding === 4) striker.battingStats.fours += 1;
        if (runsToAdding === 6) striker.battingStats.sixes += 1;
      }

      // Update bowler stats
      const activeBowler = activeInnings.bowlers?.find((b) => b.playerId === match.activeBowlerId);
      if (activeBowler) {
        if (!activeBowler.bowlingStats) activeBowler.bowlingStats = { overs: 0, balls: 0, maidens: 0, runsConceded: 0, wickets: 0 };
        activeBowler.bowlingStats.runsConceded += runsIncurred;
        if (isBallValid) {
          activeBowler.bowlingStats.balls += 1;
          if (activeBowler.bowlingStats.balls >= 6) {
            activeBowler.bowlingStats.overs += 1;
            activeBowler.bowlingStats.balls = 0;
          }
        }
      }

      // Commentary
      const commentaryOver = `${activeInnings.overs}.${activeInnings.balls}`;
      const bowlerName = activeBowler?.name || "Bowler";
      const batterName = striker?.name || "Batter";
      let cTitle, cDesc, cCategory = "NORMAL";

      if (runsToAdding === 6) { cTitle = `SIX!`; cDesc = `SIX! Massive hit by ${batterName} off ${bowlerName}!`; cCategory = "BOUNDARY"; }
      else if (runsToAdding === 4) { cTitle = `FOUR!`; cDesc = `FOUR! Elegant boundary by ${batterName} off ${bowlerName}.`; cCategory = "BOUNDARY"; }
      else if (type === "WD" || type === "WD_RUNS") { cTitle = `WIDE!`; cDesc = `Wide ball by ${bowlerName}.`; cCategory = "EXTRA"; }
      else if (type === "NB" || type === "NB_RUNS") { cTitle = `NO BALL!`; cDesc = `No ball by ${bowlerName}.`; cCategory = "EXTRA"; }
      else if (runsIncurred === 0) { cTitle = `Dot ball`; cDesc = `Good delivery by ${bowlerName} to ${batterName}.`; }
      else { cTitle = `${runsIncurred} run${runsIncurred === 1 ? "" : "s"}`; cDesc = `${runsIncurred} run${runsIncurred === 1 ? "" : "s"} scored.`; }

      match.commentary.unshift({
        id: `c-add-${Date.now()}`,
        over: commentaryOver,
        type: cCategory,
        title: cTitle,
        description: cDesc,
        timestamp: new Date().toISOString(),
      });

      // Strike rotation on odd runs & over end
      let swapNeeded = false;
      if ((runsToAdding === 1 || runsToAdding === 3) && isBallValid) swapNeeded = true;
      if (justCompletedOver) swapNeeded = !swapNeeded;
      if (swapNeeded) {
        const tempId = match.activeBatter1Id;
        match.activeBatter1Id = match.activeBatter2Id;
        match.activeBatter2Id = tempId;
      }

      // Win probability adjustment
      const delta = runsIncurred > 3 ? 3 : runsIncurred === 0 ? -1 : 0.5;
      match.winProbability.teamA = Math.max(10, Math.min(90, match.winProbability.teamA + delta));
      match.winProbability.teamB = 100 - match.winProbability.teamA;

      updateMatchesList(state);
    },

    addCommentaryRealtime: (state, action) => {
      const match = state.currentMatch;
      if (!match?.commentary) return;
      const payload = action.payload;
      const newId = payload.id || payload._id;
      const exists = match.commentary.some((c) => (c.id || c._id) === newId);
      if (!exists) match.commentary.unshift(payload);
    },

    removeCommentaryRealtime: (state, action) => {
      const match = state.currentMatch;
      if (!match?.commentary) return;
      const targetId = action.payload;
      match.commentary = match.commentary.filter((item) => (item.id || item._id) !== targetId);
    },

    syncScores: (state) => {
      state.isSynced = true;
      updateMatchesList(state);
    },
  },
});

export const {
  loadExternalMatch,
  setActiveMatch,
  createDynamicMatch,
  addPlayerToRoster,
  bulkAddPlayersToRoster,
  updateBallEvent,
  undoScore,
  syncScores,
  saveToHistory,
  startMatchSetup,
  swapStrike,
  changeBowler,
  triggerMatchFlowEvent,
  commitWicketState,
  dismissBanner,
  addCommentaryRealtime,
  removeCommentaryRealtime,
} = matchSlice.actions;

export default matchSlice.reducer;
