import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import apiClient from "../lib/axios.js";

/**
 * Transform a backend match document to frontend-friendly format.
 * Backend returns: { _id, seriesId, matchNumber, venue, startTime, status, team1: {_id,name,shortName,...}, team2: {...} }
 * Frontend expects team as object with id/name/shortName.
 */
const transformMatch = (match) => {
  if (!match) return null;

  const team1 = match.team1 || {};
  const team2 = match.team2 || {};
  const series = match.seriesId || {};

  // Common team fields for both naming conventions
  const team1Fields = {
    _id: team1._id,
    name: team1.name || "Team 1",
    shortName: team1.shortName || "T1",
    logo: team1.logo || "",
    primaryColor: team1.primaryColor || "#16a34a",
  };
  const team2Fields = {
    _id: team2._id,
    name: team2.name || "Team 2",
    shortName: team2.shortName || "T2",
    logo: team2.logo || "",
    primaryColor: team2.primaryColor || "#16a34a",
  };

  return {
    _id: match._id,
    id: match._id,
    title: `${team1Fields.shortName} vs ${team2Fields.shortName}`,
    subtitle: series?.name
      ? `${series.name}${match.matchNumber ? ` • Match ${match.matchNumber}` : ""}`
      : match.venue || "",
    matchNumber: match.matchNumber || "",
    venue: match.venue || "",
    startTime: match.startTime,
    status: match.status || "UPCOMING",
    // team1/team2 naming (used by FixturesPage, MatchCardFull)
    team1: team1Fields,
    team2: team2Fields,
    // teamA/teamB naming (used by ScoreboardPage, SetupWizard)
    teamA: { ...team1Fields, id: team1Fields._id },
    teamB: { ...team2Fields, id: team2Fields._id },
    series: series?.name || "",
    seriesId: series?._id || "",
    tossWinner: match.tossWinner || null,
    tossDecision: match.tossDecision || null,
    winner: match.winner || null,
    result: match.result || "",
  };
};

/**
 * Custom hook to get live match details.
 * Fetches from backend, falls back to Redux local state if backend is unavailable.
 */
export const useLiveMatchQuery = (matchId, options = {}) => {
  const currentReduxState = useSelector((state) => state.match.currentMatch);

  return useQuery({
    queryKey: ["match", matchId],
    queryFn: async () => {
      if (!matchId) return currentReduxState;
      try {
        const response = await apiClient.get(`/matches/${matchId}`);
        const matchData = response.data?.data || response.data;
        return transformMatch(matchData);
      } catch {
        console.warn("[BoundaryLine Query] Backend not available. Serving local Redux live match engine state.");
        return currentReduxState;
      }
    },
    enabled: options.enabled !== undefined ? options.enabled : !!matchId,
    initialData: currentReduxState,
    refetchInterval: 5000,
  });
};

/**
 * Custom hook to list recent / active matches from backend.
 * Transforms backend match format to frontend-friendly structure.
 */
export const useMatchesQuery = () => {
  return useQuery({
    queryKey: ["matches"],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/matches");
        const rawMatches = response.data?.data || response.data || [];
        // Handle both array and { matches: [...] } response shapes
        const matchArray = Array.isArray(rawMatches)
          ? rawMatches
          : rawMatches.matches || [];
        return matchArray.map(transformMatch).filter(Boolean);
      } catch (error) {
        console.warn("[BoundaryLine Query] Failed to fetch matches:", error.message);
        return [];
      }
    },
    refetchInterval: 10000,
  });
};

/**
 * Custom hook to get all teams from backend.
 */
export const useTeamsQuery = () => {
  return useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/teams");
        const teamsData = response.data?.data || response.data || [];
        const teamsArray = Array.isArray(teamsData) ? teamsData : teamsData.teams || [];
        return teamsArray.map((team) => ({
          _id: team._id,
          id: team._id,
          name: team.name || "",
          shortName: team.shortName || "",
          logo: team.logo || "",
          primaryColor: team.primaryColor || "#16a34a",
          board: team.board || "",
          region: team.region || "",
          squadPlayers: team.squadPlayers || [],
        }));
      } catch (error) {
        console.warn("[BoundaryLine Query] Failed to fetch teams:", error.message);
        return [];
      }
    },
  });
};

/**
 * Custom hook to get team player lists.
 * Fetches players from the backend players endpoint.
 */
export const usePlayersQuery = (teamId) => {
  return useQuery({
    queryKey: ["players", teamId],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/players");
        const playersData = response.data?.data || response.data || [];
        const playersArray = Array.isArray(playersData) ? playersData : playersData.players || [];
        return playersArray.map((player) => ({
          _id: player._id,
          id: player._id,
          playerId: player._id,
          name: player.name || "",
          shortName: player.shortName || "",
          role: player.role || "BATTER",
          battingStyle: player.battingStyle || "RIGHT_HAND",
          bowlingStyle: player.bowlingStyle || "NONE",
          country: player.country || "",
          image: player.image || "",
        }));
      } catch (error) {
        console.warn("[BoundaryLine Query] Failed to fetch players:", error.message);
        return [];
      }
    },
    enabled: !!teamId,
  });
};

/**
 * Custom hook to fetch scores for a match.
 */
export const useMatchScoresQuery = (matchId) => {
  return useQuery({
    queryKey: ["scores", matchId],
    queryFn: async () => {
      try {
        const response = await apiClient.get(`/scores/match/${matchId}`);
        const scoresData = response.data?.data || response.data || [];
        return Array.isArray(scoresData) ? scoresData : scoresData.scores || [];
      } catch (error) {
        console.warn("[BoundaryLine Query] Failed to fetch scores:", error.message);
        return [];
      }
    },
    enabled: !!matchId,
    refetchInterval: 5000,
  });
};

/**
 * Custom hook to fetch ball-by-ball commentary for a match.
 * GET /api/commentary/match/:matchId returns commentary entries
 * sorted by newest first, with the enriched fields from Phase 1.
 */
export const useCommentaryQuery = (matchId) => {
  return useQuery({
    queryKey: ["commentary", matchId],
    queryFn: async () => {
      if (!matchId) return [];
      try {
        const response = await apiClient.get(`/commentary/match/${matchId}`);
        const rawData = response.data?.data || response.data || [];
        const commentaryArray = Array.isArray(rawData) ? rawData : [];
        // Map to frontend-friendly format
        return commentaryArray.map((c) => ({
          id: c._id || c.id,
          _id: c._id,
          matchId: c.matchId,
          over: c.over,
          ball: c.ball,
          text: c.text || "",
          type: c.type || "NORMAL",
          // Enriched fields
          innings: c.innings,
          runsScored: c.runsScored ?? 0,
          extraRuns: c.extraRuns ?? 0,
          isLegalDelivery: c.isLegalDelivery ?? true,
          batterId: c.batterId,
          bowlerId: c.bowlerId,
          nonStrikerId: c.nonStrikerId,
          dismissal: c.dismissal,
          timestamp: c.createdAt,
        }));
      } catch (error) {
        console.warn("[BoundaryLine Query] Failed to fetch commentary:", error.message);
        return [];
      }
    },
    enabled: !!matchId,
    refetchInterval: 5000,
  });
};

/**
 * Fetch squad players for a given team from the backend.
 * GET /api/squads/:teamId returns players in that squad.
 */
export const useSquadPlayersQuery = (seriesId, teamId) => {
  return useQuery({
    queryKey: ["squad-players", seriesId, teamId],
    queryFn: async () => {
      if (!teamId) return [];
      try {
        // Squad endpoint: GET /api/squads returns all squads; filter client-side
        // Or we can fetch all squads and find by teamId
        const response = await apiClient.get("/squads");
        const squadsData = response.data?.data || response.data || [];
        const squadsArray = Array.isArray(squadsData) ? squadsData : squadsData.squads || [];

        // Find the squad for this team (last one created, if multiple)
        const teamSquad = squadsArray
          .filter((s) => {
            const squadTeamId = s.teamId?._id || s.teamId || "";
            const squadSeriesId = s.seriesId?._id || s.seriesId || "";
            return String(squadTeamId) === String(teamId) && (!seriesId || String(squadSeriesId) === String(seriesId));
          })
          .pop();

        if (!teamSquad) return [];

        // Return the player IDs from the squad
        const players = teamSquad.players || [];
        return players.map((p) => ({
          _id: p._id,
          id: p._id,
          playerId: p._id,
          name: p.name || "",
          shortName: p.shortName || "",
          role: p.role || "BATTER",
          battingStyle: p.battingStyle || "RIGHT_HAND",
          bowlingStyle: p.bowlingStyle || "NONE",
          country: p.country || "",
          image: p.image || "",
        }));
      } catch (error) {
        console.warn("[BoundaryLine Query] Failed to fetch squad players:", error.message);
        return [];
      }
    },
    enabled: !!teamId,
  });
};

/**
 * Custom mutation to publish scores to the backend.
 * Uses the actual backend endpoint: POST /api/private/scores
 */
export const usePublishScoreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ matchId, scoreData }) => {
      const payload = {
        matchId,
        innings: scoreData.innings || 1,
        battingTeam: scoreData.battingTeam,
        score: scoreData.runs || 0,
        wickets: scoreData.wickets || 0,
        overs: scoreData.overs || "0.0",
        runRate: scoreData.runRate || 0,
        target: scoreData.target || undefined,
      };
      const response = await apiClient.post("/private/scores", payload);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["scores", variables.matchId] });
      queryClient.invalidateQueries({ queryKey: ["match", variables.matchId] });
    },
  });
};

/**
 * Custom hook to get all tournaments from backend.
 */
export const useTournamentsQuery = () => {
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/tournaments");
        const rawData = response.data?.data || response.data || [];
        return Array.isArray(rawData) ? rawData : rawData.tournaments || [];
      } catch (error) {
        console.warn("[BoundaryLine Query] Failed to fetch tournaments:", error.message);
        return [];
      }
    },
  });
};

/**
 * Custom hook to get a single tournament detail.
 */
export const useTournamentDetailQuery = (tournamentId) => {
  return useQuery({
    queryKey: ["tournament", tournamentId],
    queryFn: async () => {
      if (!tournamentId) return null;
      try {
        const response = await apiClient.get(`/tournaments/${tournamentId}`);
        return response.data?.data || response.data;
      } catch (error) {
        console.warn("[BoundaryLine Query] Failed to fetch tournament detail:", error.message);
        return null;
      }
    },
    enabled: !!tournamentId,
  });
};
