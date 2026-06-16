import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCreateMatchMutation, useDeleteMatchMutation } from "../api/adminMutations.js";
import apiClient from "../../../shared/lib/axios.js";
import {
  CalendarPlus,
  Plus,
  Loader2,
  AlertCircle,
  Trash2,
  Check,
} from "lucide-react";

export default function AdminMatchesPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    seriesId: "",
    team1: "",
    team2: "",
    venue: "",
    startTime: "",
    matchNumber: "",
  });

  // Fetch matches
  const { data: matches = [], isLoading, isError, error } = useQuery({
    queryKey: ["admin-matches"],
    queryFn: async () => {
      const response = await apiClient.get("/matches");
      const data = response.data?.data || response.data || [];
      return Array.isArray(data) ? data : data.matches || [];
    },
  });

  // Fetch teams for dropdown
  const { data: teams = [] } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const response = await apiClient.get("/teams");
      const data = response.data?.data || response.data || [];
      return Array.isArray(data) ? data : data.teams || [];
    },
  });

  // Fetch series for dropdown
  const { data: series = [] } = useQuery({
    queryKey: ["series"],
    queryFn: async () => {
      const response = await apiClient.get("/series");
      const data = response.data?.data || response.data || [];
      return Array.isArray(data) ? data : data.series || [];
    },
  });

  const createMutation = useCreateMatchMutation();
  const deleteMutation = useDeleteMatchMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.team1 === formData.team2) {
      alert("Team 1 and Team 2 must be different teams!");
      return;
    }
    try {
      await createMutation.mutateAsync({
        ...formData,
        startTime: new Date(formData.startTime).toISOString(),
        matchNumber: formData.matchNumber || undefined,
      });
      setFormData({ seriesId: "", team1: "", team2: "", venue: "", startTime: "", matchNumber: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Failed to create match:", err);
    }
  };

  const handleDelete = async (matchId) => {
    if (!window.confirm("Are you sure you want to delete this match?")) return;
    try {
      await deleteMutation.mutateAsync(matchId);
    } catch (err) {
      console.error("Failed to delete match:", err);
    }
  };

  const statusColors = {
    LIVE: "bg-red-500/15 text-red-400 border-red-500/20",
    UPCOMING: "bg-[#94d5a5]/10 text-[#94d5a5] border-[#94d5a5]/20",
    COMPLETED: "bg-white/[0.03] text-gray-400 border-white/5",
    INNINGS_BREAK: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  };

  const getTeamName = (teamId) => {
    const team = teams.find((t) => t._id === teamId);
    return team ? `${team.name} (${team.shortName})` : teamId?.slice(0, 8) + "...";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#94d5a5]">Management</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Matches</h1>
          <p className="mt-1 text-sm text-[#aeb8b0]">
            Create and manage match fixtures. Select teams and series from existing data.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#94d5a5] text-[#06361f] font-bold text-sm hover:brightness-110 transition-all"
        >
          <Plus className="h-4 w-4" />
          {showForm ? "Cancel" : "Create Match"}
        </button>
      </div>

      {/* Create Match Form */}
      {showForm && (
        <div className="mb-8 rounded-xl border border-[#94d5a5]/20 bg-[#11171b] p-6">
          <h2 className="text-lg font-bold text-white mb-4">New Match Fixture</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Series Select */}
            <div>
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">Series *</label>
              <select
                required
                value={formData.seriesId}
                onChange={(e) => setFormData({ ...formData, seriesId: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0b1013] border border-white/10 text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors"
              >
                <option value="">-- Select Series --</option>
                {series.map((s) => (
                  <option key={s._id} value={s._id}>{s.name} ({s.shortName})</option>
                ))}
              </select>
              {series.length === 0 && (
                <p className="text-xs text-amber-400 mt-1">No series found. Create one in the Series page first.</p>
              )}
            </div>

            {/* Match Number */}
            <div>
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">Match Number</label>
              <input
                type="text"
                value={formData.matchNumber}
                onChange={(e) => setFormData({ ...formData, matchNumber: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0b1013] border border-white/10 text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors"
                placeholder="e.g. Match 1, Final"
              />
            </div>

            {/* Team 1 */}
            <div>
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">Team 1 *</label>
              <select
                required
                value={formData.team1}
                onChange={(e) => setFormData({ ...formData, team1: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0b1013] border border-white/10 text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors"
              >
                <option value="">-- Select Team 1 --</option>
                {teams.map((t) => (
                  <option key={t._id} value={t._id}>{t.name} ({t.shortName})</option>
                ))}
              </select>
              {teams.length < 2 && (
                <p className="text-xs text-amber-400 mt-1">Need at least 2 teams. Create them in the Teams page first.</p>
              )}
            </div>

            {/* Team 2 */}
            <div>
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">Team 2 *</label>
              <select
                required
                value={formData.team2}
                onChange={(e) => setFormData({ ...formData, team2: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg bg-[#0b1013] border text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors ${
                  formData.team1 && formData.team2 && formData.team1 === formData.team2
                    ? "border-red-500/50"
                    : "border-white/10"
                }`}
              >
                <option value="">-- Select Team 2 --</option>
                {teams.map((t) => (
                  <option key={t._id} value={t._id}>{t.name} ({t.shortName})</option>
                ))}
              </select>
              {formData.team1 && formData.team2 && formData.team1 === formData.team2 && (
                <p className="text-xs text-red-400 mt-1">Team 1 and Team 2 must be different!</p>
              )}
            </div>

            {/* Venue */}
            <div>
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">Venue *</label>
              <input
                type="text"
                required
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0b1013] border border-white/10 text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors"
                placeholder="e.g. Wankhede Stadium, Mumbai"
              />
            </div>

            {/* Start Time */}
            <div>
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">Start Date & Time *</label>
              <input
                type="datetime-local"
                required
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0b1013] border border-white/10 text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors"
              />
            </div>

            {/* Actions */}
            <div className="md:col-span-2 flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-3 rounded-xl border border-white/10 text-sm font-semibold text-[#aeb8b0] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createMutation.isPending || !series.length || teams.length < 2}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#94d5a5] text-[#06361f] font-bold text-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                {createMutation.isPending ? "Creating..." : "Create Match"}
              </button>
            </div>

            {createMutation.isError && (
              <div className="md:col-span-2 flex items-center gap-2 text-red-400 text-sm bg-red-500/10 rounded-lg px-4 py-3">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {createMutation.error?.response?.data?.message || createMutation.error?.message || "Failed to create match"}
              </div>
            )}
            {createMutation.isSuccess && (
              <div className="md:col-span-2 flex items-center gap-2 text-[#94d5a5] text-sm bg-[#94d5a5]/10 rounded-lg px-4 py-3">
                <Check className="h-4 w-4 shrink-0" />
                Match created successfully!
              </div>
            )}
          </form>
        </div>
      )}

      {/* Matches List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20 gap-3">
          <Loader2 className="h-6 w-6 text-[#94d5a5] animate-spin" />
          <p className="text-sm text-[#aeb8b0]">Loading matches...</p>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center py-20 gap-3">
          <AlertCircle className="h-8 w-8 text-red-400" />
          <p className="text-sm text-red-400">{error?.message || "Failed to load matches"}</p>
        </div>
      ) : matches.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <CalendarPlus className="h-12 w-12 text-[#94d5a5] opacity-40" />
          <p className="text-sm font-semibold text-[#aeb8b0]">No matches yet</p>
          <p className="text-xs text-[#6b7a72]">Create your first match fixture to get started.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {matches.map((match) => {
            const team1Name = match.team1?.name || getTeamName(match.team1);
            const team2Name = match.team2?.name || getTeamName(match.team2);
            const team1Short = match.team1?.shortName || match.team1?.slice(0, 3);
            const team2Short = match.team2?.shortName || match.team2?.slice(0, 3);

            return (
              <div
                key={match._id}
                className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-[#11171b] hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-[#0b1013] border border-white/10">
                    <span className="text-xs font-bold text-[#94d5a5]">{team1Short}</span>
                    <span className="text-[8px] text-[#6b7a72]">VS</span>
                    <span className="text-xs font-bold text-[#94d5a5]">{team2Short}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">
                      {team1Name} vs {team2Name}
                    </p>
                    <p className="text-xs text-[#aeb8b0] truncate">
                      {match.venue} {match.matchNumber ? `• ${match.matchNumber}` : ""}
                    </p>
                    <p className="text-[10px] text-[#6b7a72] mt-0.5">
                      {formatDate(match.startTime)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
                    statusColors[match.status] || statusColors.UPCOMING
                  }`}>
                    {match.status || "UPCOMING"}
                  </span>
                  <button
                    onClick={() => handleDelete(match._id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                    title="Delete match"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
