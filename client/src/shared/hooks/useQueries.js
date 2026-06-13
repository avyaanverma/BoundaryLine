import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import apiClient from "../lib/axios.js";

/**
 * Custom hook to get live match details.
 * Integrates Redux local status as dynamic fallback when backend is unavailable.
 */
export const useLiveMatchQuery = (matchId) => {
  const currentReduxState = useSelector((state) => state.match.currentMatch);

  return useQuery({
    queryKey: ["match", matchId],
    queryFn: async () => {
      try {
        const response = await apiClient.get(`/matches/${matchId}`);
        return response.data;
      } catch (err) {
        console.warn("[BoundaryLine Query] Backend not available. Serving local Redux live match engine state.");
        return currentReduxState;
      }
    },
    // Keep it synced to local Redux state updates for instant interactivity
    initialData: currentReduxState,
    refetchInterval: 3000, // 3 seconds polling
  });
};

/**
 * Custom hook to list recent / active matches.
 */
export const useMatchesQuery = () => {
  return useQuery({
    queryKey: ["matches"],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/matches");
        return response.data;
      } catch (err) {
        // Fallback list of matches
        return [
          {
            id: "IND_AUS",
            title: "IND vs AUS",
            subtitle: "LIVE • T20 Finals",
            status: "LIVE",
            teamA: { id: "IND", name: "India", shortName: "IND" },
            teamB: { id: "AUS", name: "Australia", shortName: "AUS" },
            currentInningsNum: 1,
            innings: [],
            activeBatter1Id: "p-rohit",
            activeBatter2Id: "p-surya",
            activeBowlerId: "p-bumrah",
            thisOver: ["1", "WD", "4", "W", "2", "NB", "●"],
            commentary: [],
            winProbability: { teamA: 62, teamB: 38, trend: "" },
            aiInsights: []
          },
          {
            id: "MI_CSK",
            title: "MI vs CSK",
            subtitle: "LIVE • T20 Finals",
            status: "LIVE",
            teamA: { id: "MI", name: "Mumbai Indians", shortName: "MI" },
            teamB: { id: "CSK", name: "Chennai Super Kings", shortName: "CSK" },
            currentInningsNum: 1,
            innings: [],
            activeBatter1Id: "p-ishan-mi",
            activeBatter2Id: "p-surya-mi",
            activeBowlerId: "p-chahar",
            thisOver: ["1", "WD", "6", "2", "NB", "W", "●"],
            commentary: [],
            winProbability: { teamA: 62, teamB: 38, trend: "" },
            aiInsights: []
          }
        ];
      }
    }
  });
};

/**
 * Custom hook to get team player lists.
 */
export const usePlayersQuery = (teamId) => {
  return useQuery({
    queryKey: ["players", teamId],
    queryFn: async () => {
      try {
        const response = await apiClient.get(`/teams/${teamId}/players`);
        return response.data;
      } catch (err) {
        // Return standard cricket squad
        return [
          { playerId: "1", name: "Rohit Sharma", role: "BATTER" },
          { playerId: "2", name: "Virat Kohli", role: "BATTER" },
          { playerId: "3", name: "Suryakumar Yadav", role: "BATTER" },
          { playerId: "4", name: "Ishan Kishan", role: "WICKET_KEEPER" },
          { playerId: "5", name: "Hardik Pandya", role: "ALL_ROUNDER" },
          { playerId: "6", name: "Jasprit Bumrah", role: "BOWLER" },
          { playerId: "7", name: "Ravindra Jadeja", role: "ALL_ROUNDER" },
        ];
      }
    }
  });
};

/**
 * Custom mutation to publish scorer events to the database/backend.
 */
export const usePublishScoreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ matchId, ballData }) => {
      const response = await apiClient.post(`/matches/${matchId}/ball`, ballData);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["match", variables.matchId] });
    }
  });
};
