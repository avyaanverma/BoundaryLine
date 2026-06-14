// Admin Dashboard DTO Dashboard response clean format me convert karega
export default class AdminDashboardDTO {
  constructor(dashboardData = {}) {
    this.totalMatches = dashboardData.totalMatches ?? 0;
    this.totalUsers = dashboardData.totalUsers ?? 0;
    this.totalPlayers = dashboardData.totalPlayers ?? 0;
    this.totalTeams = dashboardData.totalTeams ?? 0;
    this.activeLiveMatches = dashboardData.activeLiveMatches ?? 0;
    this.completedMatches = dashboardData.completedMatches ?? 0;
    this.lastUpdated = dashboardData.lastUpdated ?? null;
    this.updatedBy = dashboardData.updatedBy ?? null;
  }
}
