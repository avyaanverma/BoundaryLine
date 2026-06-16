import apiClient from "../../../shared/lib/axios.js";

const unwrapData = (response) => response.data?.data ?? null;

export const fetchAdminDashboard = async () => {
  const [dashboard, matches, users, players, health] = await Promise.all([
    apiClient.get("/admin/dashboard", { params: { includeStats: true } }),
    apiClient.get("/admin/matches"),
    apiClient.get("/admin/users"),
    apiClient.get("/admin/players"),
    apiClient.get("/admin/health"),
  ]);

  return {
    dashboard: unwrapData(dashboard),
    matches: unwrapData(matches),
    users: unwrapData(users),
    players: unwrapData(players),
    health: unwrapData(health),
  };
};
