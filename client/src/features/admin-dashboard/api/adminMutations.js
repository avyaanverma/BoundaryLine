import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../shared/lib/axios.js";

/**
 * Create a new team.
 * POST /api/private/teams
 * Requires: name, shortName, logo (required); primaryColor, squadPlayers (optional)
 */
export const useCreateTeamMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (teamData) => {
      const response = await apiClient.post("/private/teams", teamData);
      return response.data?.data || response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    },
  });
};

/**
 * Create a new player.
 * POST /api/private/players
 * Requires: name, role; optional: shortName, battingStyle, bowlingStyle, country, image
 */
export const useCreatePlayerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (playerData) => {
      const response = await apiClient.post("/private/players", playerData);
      return response.data?.data || response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    },
  });
};

/**
 * Create a new match.
 * POST /api/private/matches
 * Requires: seriesId, team1, team2, venue, startTime; optional: matchNumber
 */
export const useCreateMatchMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (matchData) => {
      const response = await apiClient.post("/private/matches", matchData);
      return response.data?.data || response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    },
  });
};

/**
 * Create a new series.
 * POST /api/private/series
 */
export const useCreateSeriesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (seriesData) => {
      const response = await apiClient.post("/private/series", seriesData);
      return response.data?.data || response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["series"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    },
  });
};

/**
 * Delete a match (soft-delete).
 * DELETE /api/private/matches/:id
 */
export const useDeleteMatchMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (matchId) => {
      const response = await apiClient.delete(`/private/matches/${matchId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });
};

/**
 * Delete a team (soft-delete).
 * DELETE /api/private/teams/:id
 */
export const useDeleteTeamMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (teamId) => {
      const response = await apiClient.delete(`/private/teams/${teamId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
};

/**
 * Delete a player (soft-delete).
 * DELETE /api/private/players/:id
 */
export const useDeletePlayerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (playerId) => {
      const response = await apiClient.delete(`/private/players/${playerId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });
};
