// Admin Dashboard DTO Dashboard response clean format me convert karega
export default class AdminDashboardDTO {
  constructor(data = {}) {
    this.totalMatches = data.totalMatches ?? 0;
    this.totalUsers = data.totalUsers ?? 0;
    this.totalPlayers = data.totalPlayers ?? 0;
    this.totalTeams = data.totalTeams ?? 0;
    this.activeLiveMatches = data.activeLiveMatches ?? 0;
    this.completedMatches = data.completedMatches ?? 0;
    this.lastUpdated = data.lastUpdated ?? null;
    this.updatedBy = data.updatedBy ?? null;
  }
}