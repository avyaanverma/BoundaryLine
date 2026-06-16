import { createSlice } from "@reduxjs/toolkit";

// Master Rosters database for professional player selections
export const MASTER_ROSTERS = {
  IND: [
    { id: "p-rohit", name: "Rohit Sharma", role: "BATTER" },
    { id: "p-ishan", name: "Ishan Kishan", role: "WICKET_KEEPER" },
    { id: "p-surya", name: "Suryakumar Yadav", role: "BATTER" },
    { id: "p-hardik", name: "Hardik Pandya", role: "ALL_ROUNDER" },
    { id: "p-pant", name: "Rishabh Pant", role: "WICKET_KEEPER" },
    { id: "p-kohli", name: "Virat Kohli", role: "BATTER" },
    { id: "p-jadeja", name: "Ravindra Jadeja", role: "ALL_ROUNDER" },
    { id: "p-axar", name: "Axar Patel", role: "ALL_ROUNDER" },
    { id: "p-bumrah", name: "Jasprit Bumrah", role: "BOWLER" },
    { id: "p-shami", name: "Mohammed Shami", role: "BOWLER" },
    { id: "p-chahal", name: "Yuzvendra Chahal", role: "BOWLER" },
    { id: "p-arshdeep", name: "Arshdeep Singh", role: "BOWLER" },
    { id: "p-siraj", name: "Mohammed Siraj", role: "BOWLER" },
  ],
  AUS: [
    { id: "p-head", name: "Travis Head", role: "BATTER" },
    { id: "p-warner", name: "David Warner", role: "BATTER" },
    { id: "p-marsh", name: "Mitchell Marsh", role: "ALL_ROUNDER" },
    { id: "p-maxwell", name: "Glenn Maxwell", role: "ALL_ROUNDER" },
    { id: "p-stoinis", name: "Marcus Stoinis", role: "ALL_ROUNDER" },
    { id: "p-david", name: "Tim David", role: "BATTER" },
    { id: "p-wade", name: "Matthew Wade", role: "WICKET_KEEPER" },
    { id: "p-cummins", name: "Pat Cummins", role: "BOWLER" },
    { id: "p-starc", name: "Mitchell Starc", role: "BOWLER" },
    { id: "p-hazlewood", name: "Josh Hazlewood", role: "BOWLER" },
    { id: "p-zampa", name: "Adam Zampa", role: "BOWLER" },
    { id: "p-inglis", name: "Josh Inglis", role: "WICKET_KEEPER" },
    { id: "p-green", name: "Cameron Green", role: "ALL_ROUNDER" },
  ],
  MI: [
    { id: "p-rohit-mi", name: "Rohit Sharma", role: "BATTER" },
    { id: "p-ishan-mi", name: "Ishan Kishan", role: "WICKET_KEEPER" },
    { id: "p-surya-mi", name: "Suryakumar Yadav", role: "BATTER" },
    { id: "p-hardik-mi", name: "Hardik Pandya", role: "ALL_ROUNDER" },
    { id: "p-tilak-mi", name: "Tilak Varma", role: "BATTER" },
    { id: "p-david-mi", name: "Tim David", role: "BATTER" },
    { id: "p-shepherd-mi", name: "Romario Shepherd", role: "ALL_ROUNDER" },
    { id: "p-coetzee-mi", name: "Gerald Coetzee", role: "BOWLER" },
    { id: "p-bumrah-mi", name: "Jasprit Bumrah", role: "BOWLER" },
    { id: "p-chawla-mi", name: "Piyush Chawla", role: "BOWLER" },
    { id: "p-madhwal-mi", name: "Akash Madhwal", role: "BOWLER" },
    { id: "p-wadhera-mi", name: "Nehal Wadhera", role: "BATTER" },
    { id: "p-gopal-mi", name: "Shreyas Gopal", role: "BOWLER" },
  ],
  CSK: [
    { id: "p-gaikwad-csk", name: "Ruturaj Gaikwad", role: "BATTER" },
    { id: "p-rachin-csk", name: "Rachin Ravindra", role: "ALL_ROUNDER" },
    { id: "p-rahane-csk", name: "Ajinkya Rahane", role: "BATTER" },
    { id: "p-mitchell-csk", name: "Daryl Mitchell", role: "ALL_ROUNDER" },
    { id: "p-jadeja-csk", name: "Ravindra Jadeja", role: "ALL_ROUNDER" },
    { id: "p-dhoni-csk", name: "MS Dhoni", role: "WICKET_KEEPER" },
    { id: "p-rizvi-csk", name: "Sameer Rizvi", role: "BATTER" },
    { id: "p-thakur-csk", name: "Shardul Thakur", role: "ALL_ROUNDER" },
    { id: "p-chahar-csk", name: "Deepak Chahar", role: "BOWLER" },
    { id: "p-pathirana-csk", name: "Matheesha Pathirana", role: "BOWLER" },
    { id: "p-deshpande-csk", name: "Tushar Deshpande", role: "BOWLER" },
    { id: "p-ali-csk", name: "Moeen Ali", role: "ALL_ROUNDER" },
    { id: "p-santner-csk", name: "Mitchell Santner", role: "ALL_ROUNDER" },
  ],
};

const initialMatchIndAus = {
  id: "IND_AUS",
  title: "IND vs AUS",
  subtitle: "LIVE • T20 Finals",
  status: "LIVE",
  matchPhase: "LIVE",
  teamA: { id: "IND", name: "India", shortName: "IND" },
  teamB: { id: "AUS", name: "Australia", shortName: "AUS" },
  currentInningsNum: 1,
  innings: [
    {
      teamId: "IND",
      teamName: "India",
      runs: 185,
      wickets: 4,
      overs: 18,
      balls: 2, // 18.2 overs
      extras: { wides: 4, noBalls: 1, byes: 1, legByes: 2, total: 8 },
      batters: [
        {
          playerId: "p-rohit",
          name: "Rohit Sharma",
          role: "BATTER",
          battingStats: {
            runs: 42,
            balls: 28,
            fours: 4,
            sixes: 2,
            isOut: false,
          },
        },
        {
          playerId: "p-surya",
          name: "Suryakumar Yadav",
          role: "BATTER",
          battingStats: {
            runs: 12,
            balls: 8,
            fours: 1,
            sixes: 0,
            isOut: false,
          },
        },
        {
          playerId: "p-ishan",
          name: "Ishan Kishan",
          role: "WICKET_KEEPER",
          battingStats: {
            runs: 74,
            balls: 32,
            fours: 5,
            sixes: 6,
            isOut: true,
            howOut: "c Wade b Cummins",
          },
        },
        {
          playerId: "p-hardik",
          name: "Hardik Pandya",
          role: "ALL_ROUNDER",
          battingStats: {
            runs: 49,
            balls: 22,
            fours: 3,
            sixes: 4,
            isOut: true,
            howOut: "run out (Maxwell)",
          },
        },
      ],
      bowlers: [
        {
          playerId: "p-cummins",
          name: "Pat Cummins",
          role: "BOWLER",
          bowlingStats: {
            overs: 3,
            balls: 2,
            maidens: 0,
            runsConceded: 28,
            wickets: 1,
          },
        },
      ],
    },
    {
      teamId: "AUS",
      teamName: "Australia",
      runs: 0,
      wickets: 0,
      overs: 0,
      balls: 0,
      extras: { wides: 0, noBalls: 0, byes: 0, legByes: 0, total: 0 },
      batters: [],
      bowlers: [],
    },
  ],
  activeBatter1Id: "p-rohit", // Rohit (Striker)
  activeBatter2Id: "p-surya", // Surya Kumar
  activeBowlerId: "p-cummins",
  target: 208,
  thisOver: ["1", "WD", "4", "W", "2", "NB", "●"],
  commentary: [
    {
      id: "c-1",
      over: "18.2",
      type: "WICKET",
      title: "Wicket!",
      description:
        "OUT! Caught! Cummins to Ishan Kishan, looking to clear the fence, caught on the boundary line by Wade!",
      timestamp: new Date().toISOString(),
    },
    {
      id: "c-2",
      over: "18.1",
      type: "BOUNDARY",
      title: "4 Runs",
      description:
        "FOUR! Rohit Sharma pulls it magnificently past deep midwicket for a superb boundary!",
      timestamp: new Date().toISOString(),
    },
  ],
  winProbability: {
    teamA: 62,
    teamB: 38,
    trend: "Climbing after Sharma's boundary.",
  },
  aiInsights: [
    "Bowler Economy rising: Pat Cummins has conceded 12 runs in last 4 balls.",
    "Batter Under Pressure: Suryakumar Yadav faces a 72% dot ball rate against leg spin.",
  ],
  fow: [
    {
      batterName: "Ishan Kishan",
      runs: 120,
      wickets: 3,
      over: "12.4",
      detail: "c Wade b Cummins",
    },
  ],
};

const initialMatchMiCsk = {
  id: "MI_CSK",
  title: "MI vs CSK",
  subtitle: "LIVE • T20 Finals",
  status: "LIVE",
  matchPhase: "LIVE",
  teamA: { id: "MI", name: "Mumbai Indians", shortName: "MI" },
  teamB: { id: "CSK", name: "Chennai Super Kings", shortName: "CSK" },
  currentInningsNum: 1,
  innings: [
    {
      teamId: "MI",
      teamName: "Mumbai Indians",
      runs: 185,
      wickets: 4,
      overs: 18,
      balls: 2, // 18.2 overs
      extras: { wides: 3, noBalls: 1, byes: 2, legByes: 2, total: 8 },
      batters: [
        {
          playerId: "p-ishan-mi",
          name: "Ishan Kishan",
          role: "WICKET_KEEPER",
          battingStats: {
            runs: 74,
            balls: 32,
            fours: 5,
            sixes: 6,
            isOut: false,
          },
        },
        {
          playerId: "p-surya-mi",
          name: "Suryakumar Yadav",
          role: "BATTER",
          battingStats: {
            runs: 12,
            balls: 8,
            fours: 1,
            sixes: 0,
            isOut: false,
          },
        },
      ],
      bowlers: [
        {
          playerId: "p-chahar-csk",
          name: "Deepak Chahar",
          role: "BOWLER",
          bowlingStats: {
            overs: 3,
            balls: 2,
            maidens: 0,
            runsConceded: 28,
            wickets: 2,
          },
        },
      ],
    },
    {
      teamId: "CSK",
      teamName: "Chennai Super Kings",
      runs: 0,
      wickets: 0,
      overs: 0,
      balls: 0,
      extras: { wides: 0, noBalls: 0, byes: 0, legByes: 0, total: 0 },
      batters: [],
      bowlers: [],
    },
  ],
  activeBatter1Id: "p-ishan-mi", // striker
  activeBatter2Id: "p-surya-mi", // non-striker
  activeBowlerId: "p-chahar-csk",
  target: 212, // Need 27 runs in 10 balls
  thisOver: ["1", "WD", "6", "2", "NB", "W", "●"],
  commentary: [
    {
      id: "c-101",
      over: "18.2",
      type: "WICKET",
      title: "18.2 Wicket!",
      description:
        "OUT! Caught! Chahar to Kishan, short delivery outside off. Kishan tries to pull but gets a top edge. Jadeja running in from deep mid-wicket takes a comfortable catch.",
      timestamp: new Date().toISOString(),
    },
    {
      id: "c-102",
      over: "18.1",
      type: "BOUNDARY",
      title: "18.1 6 Runs",
      description:
        "SIX! Massive hit! Overpitched by Chahar, Kishan clears his front leg and lofts it high over long-on for a 95m maximum. The crowd is erupting!",
      timestamp: new Date().toISOString(),
    },
  ],
  winProbability: {
    teamA: 62,
    teamB: 38,
    trend: "CSK bowlers feeling pressure as Ishan reaches high strike rate.",
  },
  aiInsights: [
    "Bowler Economy rising: Deepak Chahar has conceded 14 runs in last 4 balls.",
    "Batter Under Pressure: Suryakumar Yadav faces a 72% dot ball rate against spin.",
  ],
  fow: [
    {
      batterName: "Rohit Sharma",
      runs: 45,
      wickets: 1,
      over: "5.2",
      detail: "b Chahar",
    },
  ],
};

const initialState = {
  matchesList: [
    { ...initialMatchIndAus, matchPhase: "SETUP" },
    { ...initialMatchMiCsk, matchPhase: "SETUP" },
  ],
  currentMatch: { ...initialMatchIndAus, matchPhase: "SETUP" }, // Start in SETUP phase by default
  activeMatchId: "IND_AUS",
  history: [],
  isSynced: true,
  statusMessage: "Operational & Connected",
  rosters: { ...MASTER_ROSTERS },
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
      state.currentMatch.showDismissalBanner = false;
      updateMatchesList(state);
    },
    // Trigger start of professional cricket match after selections completes
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

      state.history.push(JSON.parse(JSON.stringify(match)));
      state.isSynced = false;

      // Reset score, status, extras, rosters
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

      // Populate batting lineup
      const activeBatters = (
        match.battingFirst === match.teamA.name ? teamA_XI : teamB_XI
      ).map((p) => {
        return {
          playerId: p.id,
          name: p.name,
          role: p.role,
          battingStats: {
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            isOut: false,
          },
        };
      });

      // Populate bowling lineup
      const activeBowlers = (
        match.battingFirst === match.teamA.name ? teamB_XI : teamA_XI
      ).map((p) => ({
        playerId: p.id,
        name: p.name,
        role: p.role,
        bowlingStats: {
          overs: 0,
          balls: 0,
          maidens: 0,
          runsConceded: 0,
          wickets: 0,
        },
      }));

      // Initialize Innings
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
        teamName:
          match.battingFirst === match.teamA.name
            ? match.teamB.name
            : match.teamA.name,
        runs: 0,
        wickets: 0,
        overs: 0,
        balls: 0,
        extras: { wides: 0, noBalls: 0, byes: 0, legByes: 0, total: 0 },
        batters: (match.battingFirst === match.teamA.name
          ? teamB_XI
          : teamA_XI
        ).map((p) => ({
          playerId: p.id,
          name: p.name,
          role: p.role,
          battingStats: {
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            isOut: false,
          },
        })),
        bowlers: (match.battingFirst === match.teamA.name
          ? teamA_XI
          : teamB_XI
        ).map((p) => ({
          playerId: p.id,
          name: p.name,
          role: p.role,
          bowlingStats: {
            overs: 0,
            balls: 0,
            maidens: 0,
            runsConceded: 0,
            wickets: 0,
          },
        })),
      };

      match.activeBatter1Id = strikerId;
      match.activeBatter2Id = nonStrikerId;
      match.activeBowlerId = bowlerId;
      match.thisOver = [];
      match.fow = [];
      match.lastDismissalEvent = undefined;
      match.showDismissalBanner = false;

      // Initial Commentary
      match.commentary = [
        {
          id: `c-start-${Date.now()}`,
          over: "0.0",
          type: "MILESTONE",
          title: "Match Commenced!",
          description: `${tossWinner} won the toss and elected to ${tossDecision.toLowerCase()} first. ${match.innings[0].batters.find((b) => b.playerId === strikerId)?.name} & ${match.innings[0].batters.find((b) => b.playerId === nonStrikerId)?.name} are opening the batting. ${match.innings[0].bowlers.find((b) => b.playerId === bowlerId)?.name} has the ball. Let's play!`,
          timestamp: new Date().toISOString(),
        },
      ];

      match.winProbability = {
        teamA: 50,
        teamB: 50,
        trend: "Match balanced equally at start of play.",
      };

      updateMatchesList(state);
    },

    // Swap Strike manual action
    swapStrike: (state) => {
      state.history.push(JSON.parse(JSON.stringify(state.currentMatch)));
      const temp = state.currentMatch.activeBatter1Id;
      state.currentMatch.activeBatter1Id = state.currentMatch.activeBatter2Id;
      state.currentMatch.activeBatter2Id = temp;
      state.isSynced = false;
      updateMatchesList(state);
    },

    // Change current bowler
    changeBowler: (state, action) => {
      const match = state.currentMatch;
      const activeInnings = match.innings[match.currentInningsNum - 1];
      state.history.push(JSON.parse(JSON.stringify(match)));
      match.activeBowlerId = action.payload.bowlerId;

      // Ensure active bowler object is initialized in bowlingStats
      const targetBowler = activeInnings.bowlers.find(
        (b) => b.playerId === action.payload.bowlerId,
      );
      if (targetBowler && !targetBowler.bowlingStats) {
        targetBowler.bowlingStats = {
          overs: 0,
          balls: 0,
          maidens: 0,
          runsConceded: 0,
          wickets: 0,
        };
      }

      match.matchEvent = "NORMAL"; // reset end over prompts
      state.isSynced = false;
      updateMatchesList(state);
    },

    // Trigger standard match event notifications/breaks
    triggerMatchFlowEvent: (state, action) => {
      state.history.push(JSON.parse(JSON.stringify(state.currentMatch)));
      state.currentMatch.matchEvent = action.payload;
      state.isSynced = false;
      updateMatchesList(state);
    },

    // Commit a professional wicket fall with rich metadata
    commitWicketState: (state, action) => {
      const {
        dismissalType,
        outBatterId,
        newBatterId,
        fielderId,
        bowlerId,
        keeperId,
      } = action.payload;
      const match = state.currentMatch;
      const activeInnings = match.innings[match.currentInningsNum - 1];

      state.history.push(JSON.parse(JSON.stringify(match)));
      state.isSynced = false;

      const outBatter = activeInnings.batters.find(
        (b) => b.playerId === outBatterId,
      );
      const activeBowler = activeInnings.bowlers.find(
        (b) => b.playerId === match.activeBowlerId,
      );

      let fielderName = "";
      let bowlerName = activeBowler?.name || "Bowler";
      let keeperName = "";

      if (fielderId) {
        const fObj =
          activeInnings.bowlers.find((b) => b.playerId === fielderId) ||
          activeInnings.batters.find((b) => b.playerId === fielderId);
        fielderName = fObj?.name || "";
      }
      if (bowlerId) {
        const bObj = activeInnings.bowlers.find((b) => b.playerId === bowlerId);
        bowlerName = bObj?.name || bowlerName;
      }
      if (keeperId) {
        const kObj = activeInnings.bowlers.find((b) => b.playerId === keeperId);
        keeperName = kObj?.name || "";
      }

      // Generate precise visual string and out description
      let notation;
      let detailDesc;

      switch (dismissalType) {
        case "BOWLED":
          notation = `b ${bowlerName}`;
          detailDesc = `BOWLED! Clean bowled. ${bowlerName} breaks through the defense.`;
          break;
        case "CAUGHT":
          notation = fielderName
            ? `c ${fielderName} b ${bowlerName}`
            : `c & b ${bowlerName}`;
          detailDesc = fielderName
            ? `CAUGHT! High catch taken beautifully by ${fielderName} off ${bowlerName}'s delivery.`
            : `CAUGHT! Exceptional return catch caught & bowled by ${bowlerName}.`;
          break;
        case "LBW":
          notation = `lbw b ${bowlerName}`;
          detailDesc = `LBW! Plumb in front. ${bowlerName} strikes with an absolute beauty.`;
          break;
        case "RUN_OUT":
          notation = fielderName ? `run out (${fielderName})` : `run out`;
          detailDesc = `RUN OUT! Superb direct throw from ${fielderName || "fielder"} catches the batter short of crease.`;
          break;
        case "STUMPED":
          notation = keeperName
            ? `st ${keeperName} b ${bowlerName}`
            : `stumped b ${bowlerName}`;
          detailDesc = `STUMPED! Smart awareness and quick hands behind the stumps off ${bowlerName}'s delivery.`;
          break;
        case "HIT_WICKET":
          notation = `hit wicket b ${bowlerName}`;
          detailDesc = `HIT WICKET! Unfortunate slip or hit back onto stumps.`;
          break;
        case "RETIRED":
          notation = `retired hurt`;
          detailDesc = `RETIRED! Batter leaves field retired hurt.`;
          break;
        case "OBSTRUCTING":
          notation = `obstructing field`;
          detailDesc = `DISMISSED! Obstructing the field.`;
          break;
        case "TIMED_OUT":
          notation = `timed out`;
          detailDesc = `DISMISSED! Timed out.`;
          break;
        default:
          notation = `out b ${bowlerName}`;
          detailDesc = `OUT! Dismissed.`;
          break;
      }

      notation = notation || `out b ${bowlerName}`;
      detailDesc = detailDesc || `OUT! Dismissed.`;

      // Dismiss batter
      if (outBatter && outBatter.battingStats) {
        outBatter.battingStats.isOut = true;
        outBatter.battingStats.howOut = notation;
        outBatter.battingStats.balls += 1; // plus the wicket ball
      }

      // Record Fall of Wicket
      activeInnings.wickets += 1;
      const currentOverStr = `${activeInnings.overs}.${activeInnings.balls + 1}`;
      match.fow.push({
        batterName: outBatter?.name || "Batter",
        runs: activeInnings.runs,
        wickets: activeInnings.wickets,
        over: currentOverStr,
        detail: notation,
      });

      // Update bowler statistics if it is a bowler-credited wicket
      const isBowlerWicket = [
        "BOWLED",
        "CAUGHT",
        "LBW",
        "STUMPED",
        "HIT_WICKET",
      ].includes(dismissalType);
      if (isBowlerWicket && activeBowler && activeBowler.bowlingStats) {
        activeBowler.bowlingStats.wickets += 1;
      }

      // Increment ball count for bowler
      if (activeBowler && activeBowler.bowlingStats) {
        activeBowler.bowlingStats.balls += 1;
        if (activeBowler.bowlingStats.balls >= 6) {
          activeBowler.bowlingStats.overs += 1;
          activeBowler.bowlingStats.balls = 0;
        }
      }

      // Increment innings ball count
      activeInnings.balls += 1;
      if (activeInnings.balls >= 6) {
        activeInnings.overs += 1;
        activeInnings.balls = 0;
        match.matchEvent = "END_OVER"; // prompt for bowler switch from console
      }

      // Add to Over log symbol
      if (match.thisOver.length >= 7) match.thisOver.shift();
      match.thisOver.push("W");

      // Animated Dismissal Banner setup
      match.lastDismissalEvent = {
        batterName: outBatter?.name || "Batter",
        runs: outBatter?.battingStats?.runs || 0,
        balls: outBatter?.battingStats?.balls || 0,
        detail: notation,
      };
      match.showDismissalBanner = true;

      // Append Commentary
      const item = {
        id: `c-wkt-${Date.now()}`,
        over: currentOverStr,
        type: "WICKET",
        title: `OUT! ${outBatter?.name || "Batter"} Dismissed`,
        description: `OUT! ${outBatter?.name} ${notation}. ${detailDesc} (${outBatter?.battingStats?.runs} runs off ${outBatter?.battingStats?.balls} balls).`,
        timestamp: new Date().toISOString(),
      };
      match.commentary.unshift(item);

      // Replace Batter
      if (newBatterId) {
        const isAct1 = match.activeBatter1Id === outBatterId;
        if (isAct1) {
          match.activeBatter1Id = newBatterId;
        } else {
          match.activeBatter2Id = newBatterId;
        }

        // Initialize new batter stats if needed
        const newBatterObj = activeInnings.batters.find(
          (b) => b.playerId === newBatterId,
        );
        if (newBatterObj && !newBatterObj.battingStats) {
          newBatterObj.battingStats = {
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            isOut: false,
          };
        }
      } else {
        // All Out / Innings Complete check
        const activeYetToBat = activeInnings.batters.filter(
          (b) =>
            !b.battingStats?.isOut &&
            b.playerId !== match.activeBatter1Id &&
            b.playerId !== match.activeBatter2Id,
        );
        if (activeYetToBat.length === 0 || activeInnings.wickets >= 10) {
          match.matchPhase = "COMPLETED";
          match.status = "COMPLETED";
          match.subtitle = "MATCH COMPLETED";
        }
      }

      // Win probability recalculation on wickets
      match.winProbability.teamA = Math.max(
        10,
        Math.min(90, match.winProbability.teamA - 15),
      );
      match.winProbability.teamB = 100 - match.winProbability.teamA;
      match.winProbability.trend = `Wicket fell on ${currentOverStr}. Heavy shift in momentum towards bowling side.`;

      updateMatchesList(state);
    },

    updateBallEvent: (state, action) => {
      const { type, runs, extraRuns = 0 } = action.payload;
      const match = state.currentMatch;
      const activeInnings = match.innings[match.currentInningsNum - 1];

      state.history.push(JSON.parse(JSON.stringify(match)));
      state.isSynced = false;

      let ballRepresentative = "";
      let isBallValid = true;
      let runsToAdding = runs;
      let extrasToAdding = 0;

      // Smart Commentary phrases maps
      const commentaryPhrases6 = [
        "SIX! Massive hit over long-on, clean stroke sailing into the crowd!",
        "SIX! High, handsome and deep into the stands! What a sensational shot.",
        "SIX! Lofts it effortlessly over deep midwicket. Pure timing!",
      ];
      const commentaryPhrases4 = [
        "FOUR! Driven beautifully through the covers with supreme elegance.",
        "FOUR! Short delivery smashed through midwicket. Bowler had no chance.",
        "FOUR! Flicked beautifully past fine leg. Smart and delicate.",
      ];
      const commentaryPhrasesDot = [
        "Excellent line and length, solid forward defense by the batter.",
        "Sharp delivery beat the bat, keeper gathers cleanly.",
        "Good variation, blocker back to the bowler.",
      ];
      const commentaryPhrasesRuns = [
        "Pushed softly into the gap for a quick run.",
        "Played into deep canvas, strikers gather a brace comfortably.",
        "Smart placement through single channel for runs.",
      ];

      switch (type) {
        case "RUN":
          ballRepresentative = runs === 0 ? "0" : runs.toString();
          runsToAdding = runs;
          break;
        case "WD":
          ballRepresentative = "WD";
          isBallValid = false;
          runsToAdding = 0;
          extrasToAdding = 1 + extraRuns;
          activeInnings.extras.wides += extrasToAdding;
          break;
        case "NB":
          ballRepresentative = "NB";
          isBallValid = false;
          runsToAdding = runs;
          extrasToAdding = 1;
          activeInnings.extras.noBalls += 1;
          break;
        case "WD_RUNS":
          ballRepresentative = `WD+${extraRuns}`;
          isBallValid = false;
          runsToAdding = 0;
          extrasToAdding = 1 + extraRuns;
          activeInnings.extras.wides += extrasToAdding;
          break;
        case "NB_RUNS":
          ballRepresentative = `NB+${runs}`;
          isBallValid = false;
          runsToAdding = runs;
          extrasToAdding = 1;
          activeInnings.extras.noBalls += 1;
          break;
        case "BYE":
          ballRepresentative = `B${runs}`;
          runsToAdding = 0;
          extrasToAdding = runs;
          activeInnings.extras.byes += runs;
          break;
        case "LB":
          ballRepresentative = `L${runs}`;
          runsToAdding = 0;
          extrasToAdding = runs;
          activeInnings.extras.legByes += runs;
          break;
        case "WICKET":
          ballRepresentative = "W";
          break;
        case "CUSTOM":
          ballRepresentative = action.payload.customLabel || "?";
          break;
      }

      const runsIncurred = runsToAdding + extrasToAdding;
      activeInnings.runs += runsIncurred;

      // Update balls bowled
      let justCompletedOver = false;
      if (isBallValid) {
        activeInnings.balls += 1;
        if (activeInnings.balls >= 6) {
          activeInnings.overs += 1;
          activeInnings.balls = 0;
          justCompletedOver = true;
          match.matchEvent = "END_OVER"; // prompt bowler change
        }
      }

      if (match.thisOver.length >= 7) {
        match.thisOver.shift();
      }
      match.thisOver.push(ballRepresentative);

      // Update Batters stats
      const striker = activeInnings.batters.find(
        (b) => b.playerId === match.activeBatter1Id,
      );
      if (striker) {
        if (!striker.battingStats) {
          striker.battingStats = {
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            isOut: false,
          };
        }
        if (type === "RUN" || type === "NB" || type === "NB_RUNS") {
          striker.battingStats.runs += runsToAdding;
        }
        if (type !== "WD" && type !== "WD_RUNS") {
          striker.battingStats.balls += 1;
        }
        if (runsToAdding === 4) striker.battingStats.fours += 1;
        if (runsToAdding === 6) striker.battingStats.sixes += 1;
      }

      // Update Bowler stats
      const activeBowler = activeInnings.bowlers.find(
        (b) => b.playerId === match.activeBowlerId,
      );
      if (activeBowler) {
        if (!activeBowler.bowlingStats) {
          activeBowler.bowlingStats = {
            overs: 0,
            balls: 0,
            maidens: 0,
            runsConceded: 0,
            wickets: 0,
          };
        }
        activeBowler.bowlingStats.runsConceded += runsIncurred;
        if (isBallValid) {
          activeBowler.bowlingStats.balls += 1;
          if (activeBowler.bowlingStats.balls >= 6) {
            activeBowler.bowlingStats.overs += 1;
            activeBowler.bowlingStats.balls = 0;
          }
        }
      }

      // Append Smart Commentary with variations
      const commentaryOver = `${activeInnings.overs}.${activeInnings.balls}`;
      let cTitle;
      let cDesc;
      let cCategory = "NORMAL";

      const bowlerName = activeBowler?.name || "Bowler";
      const batterName = striker?.name || "Batter";

      if (runsToAdding === 6) {
        cTitle = `SIX! ${bowlerName} to ${batterName}`;
        cDesc =
          commentaryPhrases6[
            Math.floor(Math.random() * commentaryPhrases6.length)
          ];
        cCategory = "BOUNDARY";
      } else if (runsToAdding === 4) {
        cTitle = `FOUR! ${bowlerName} to ${batterName}`;
        cDesc =
          commentaryPhrases4[
            Math.floor(Math.random() * commentaryPhrases4.length)
          ];
        cCategory = "BOUNDARY";
      } else if (type === "WD" || type === "WD_RUNS") {
        cTitle = `WIDE! ${bowlerName} to ${batterName}`;
        cDesc = `WIDE! Extra awarded off this ball. Poor bowl outside off stamp lines by ${bowlerName}.`;
        cCategory = "EXTRA";
      } else if (type === "NB" || type === "NB_RUNS") {
        cTitle = `NO BALL! ${bowlerName} to ${batterName}`;
        cDesc = `NO BALL! Over-stepped delivery, free hit incoming. ${batterName} scores ${runsToAdding} runs.`;
        cCategory = "EXTRA";
      } else if (runsIncurred === 0) {
        cTitle = `${commentaryOver} • ${bowlerName} to ${batterName}`;
        cDesc =
          commentaryPhrasesDot[
            Math.floor(Math.random() * commentaryPhrasesDot.length)
          ];
      } else {
        cTitle = `${runsIncurred} Run${runsIncurred === 1 ? "" : "s"} • ${bowlerName} to ${batterName}`;
        cDesc =
          commentaryPhrasesRuns[
            Math.floor(Math.random() * commentaryPhrasesRuns.length)
          ];
      }

      cTitle = cTitle || `${commentaryOver} • ${runsIncurred} Run${runsIncurred === 1 ? "" : "s"}`;
      cDesc = cDesc || "";

      const item = {
        id: `c-add-${Date.now()}`,
        over: commentaryOver,
        type: cCategory,
        title: cTitle,
        description: cDesc,
        timestamp: new Date().toISOString(),
      };
      match.commentary.unshift(item);
      // Strike Rotation: odd runs rotation and Over complete rotation
      let swapNeeded = false;
      if (
        (runsToAdding === 1 ||
          runsToAdding === 3 ||
          type === "BYE" ||
          type === "LB") &&
        isBallValid
      ) {
        swapNeeded = !swapNeeded;
      }
      if (justCompletedOver) {
        swapNeeded = !swapNeeded;
      }

      if (swapNeeded) {
        const tempId = match.activeBatter1Id;
        match.activeBatter1Id = match.activeBatter2Id;
        match.activeBatter2Id = tempId;
      }

      // Re-calculate win probability slightly for nice dynamic visual transitions
      let delta = runsIncurred > 3 ? 3 : runsIncurred === 0 ? -1 : 0.5;
      const newProbA = Math.max(
        10,
        Math.min(90, match.winProbability.teamA + delta),
      );
      const newProbB = 100 - newProbA;
      match.winProbability.teamA = newProbA;
      match.winProbability.teamB = newProbB;
      match.winProbability.trend =
        runsIncurred >= 4
          ? `Run-rate spiked of late as ${batterName} scores maximum comfort.`
          : `Match intensity builds as ${bowlerName} controls the deliveries.`;

      updateMatchesList(state);
    },
    addCommentaryRealtime: (state, action) => {
      const match = state.currentMatch;
      if (!match?.commentary) return;

      const payload = action.payload;

      // normalize id (support both id and _id)
      const newId = payload.id || payload._id;

      // avoid duplicates
      const exists = match.commentary.some((c) => {
        const existingId = c.id || c._id;
        return existingId === newId;
      });

      if (!exists) {
        match.commentary.unshift(payload);
      }
    },

    removeCommentaryRealtime: (state, action) => {
      const match = state.currentMatch;
      if (!match?.commentary) return;

      const targetId = action.payload;

      match.commentary = match.commentary.filter((item) => {
        const itemId = item.id || item._id;
        return itemId !== targetId;
      });
    },
    syncScores: (state) => {
      state.isSynced = true;
      updateMatchesList(state);
    },
  },
});

export const {
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
