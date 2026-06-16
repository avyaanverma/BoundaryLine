import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCreateTeamMutation, useDeleteTeamMutation } from "../api/adminMutations.js";
import apiClient from "../../../shared/lib/axios.js";
import {
  UsersRound,
  Plus,
  Loader2,
  AlertCircle,
  Trash2,
  Check,
  X,
} from "lucide-react";

export default function AdminTeamsPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    logo: "",
    primaryColor: "#16a34a",
  });

  const { data: teams = [], isLoading, isError, error } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const response = await apiClient.get("/teams");
      const data = response.data?.data || response.data || [];
      return Array.isArray(data) ? data : data.teams || [];
    },
  });

  const createMutation = useCreateTeamMutation();
  const deleteMutation = useDeleteTeamMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync(formData);
      setFormData({ name: "", shortName: "", logo: "", primaryColor: "#16a34a" });
      setShowForm(false);
    } catch (err) {
      console.error("Failed to create team:", err);
    }
  };

  const handleDelete = async (teamId) => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;
    try {
      await deleteMutation.mutateAsync(teamId);
    } catch (err) {
      console.error("Failed to delete team:", err);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#94d5a5]">Management</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Teams</h1>
          <p className="mt-1 text-sm text-[#aeb8b0]">Create and manage cricket teams.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#94d5a5] text-[#06361f] font-bold text-sm hover:brightness-110 transition-all"
        >
          <Plus className="h-4 w-4" />
          {showForm ? "Cancel" : "Create Team"}
        </button>
      </div>

      {/* Create Team Form */}
      {showForm && (
        <div className="mb-8 rounded-xl border border-[#94d5a5]/20 bg-[#11171b] p-6">
          <h2 className="text-lg font-bold text-white mb-4">New Team</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">Team Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0b1013] border border-white/10 text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors"
                placeholder="e.g. Mumbai Indians"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">Short Name *</label>
              <input
                type="text"
                required
                value={formData.shortName}
                onChange={(e) => setFormData({ ...formData, shortName: e.target.value.toUpperCase() })}
                className="w-full px-4 py-3 rounded-lg bg-[#0b1013] border border-white/10 text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors"
                placeholder="e.g. MI"
                maxLength={10}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">Logo URL *</label>
              <input
                type="url"
                required
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0b1013] border border-white/10 text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors"
                placeholder="https://example.com/logo.png"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">Primary Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  className="h-11 w-11 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  className="flex-1 px-4 py-3 rounded-lg bg-[#0b1013] border border-white/10 text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors"
                />
              </div>
            </div>
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
                disabled={createMutation.isPending}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#94d5a5] text-[#06361f] font-bold text-sm hover:brightness-110 transition-all disabled:opacity-50"
              >
                {createMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                {createMutation.isPending ? "Creating..." : "Create Team"}
              </button>
            </div>
            {createMutation.isError && (
              <div className="md:col-span-2 flex items-center gap-2 text-red-400 text-sm bg-red-500/10 rounded-lg px-4 py-3">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {createMutation.error?.response?.data?.message || createMutation.error?.message || "Failed to create team"}
              </div>
            )}
            {createMutation.isSuccess && (
              <div className="md:col-span-2 flex items-center gap-2 text-[#94d5a5] text-sm bg-[#94d5a5]/10 rounded-lg px-4 py-3">
                <Check className="h-4 w-4 shrink-0" />
                Team created successfully!
              </div>
            )}
          </form>
        </div>
      )}

      {/* Teams List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20 gap-3">
          <Loader2 className="h-6 w-6 text-[#94d5a5] animate-spin" />
          <p className="text-sm text-[#aeb8b0]">Loading teams...</p>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center py-20 gap-3">
          <AlertCircle className="h-8 w-8 text-red-400" />
          <p className="text-sm text-red-400">{error?.message || "Failed to load teams"}</p>
        </div>
      ) : teams.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <UsersRound className="h-12 w-12 text-[#94d5a5] opacity-40" />
          <p className="text-sm font-semibold text-[#aeb8b0]">No teams yet</p>
          <p className="text-xs text-[#6b7a72]">Create your first team to get started.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {teams.map((team) => (
            <div
              key={team._id}
              className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-[#11171b] hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg"
                  style={{ backgroundColor: team.primaryColor || "#16a34a", color: "#fff" }}
                >
                  {team.shortName?.slice(0, 2) || "?"}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{team.name}</p>
                  <p className="text-xs text-[#aeb8b0]">
                    {team.shortName} {team.squadPlayers?.length ? `• ${team.squadPlayers.length} players` : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {team.logo && (
                  <img src={team.logo} alt="" className="w-8 h-8 rounded object-cover border border-white/5" />
                )}
                <button
                  onClick={() => handleDelete(team._id)}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                  title="Delete team"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
