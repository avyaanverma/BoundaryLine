import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCreatePlayerMutation, useDeletePlayerMutation } from "../api/adminMutations.js";
import apiClient from "../../../shared/lib/axios.js";
import {
  UserPlus,
  Plus,
  Loader2,
  AlertCircle,
  Trash2,
  Check,
} from "lucide-react";

const PLAYER_ROLES = ["BATTER", "BOWLER", "ALL_ROUNDER", "WICKET_KEEPER"];
const BATTING_STYLES = ["RIGHT_HAND", "LEFT_HAND"];
const BOWLING_STYLES = [
  "RIGHT_ARM_FAST", "LEFT_ARM_FAST", "RIGHT_ARM_MEDIUM", "LEFT_ARM_MEDIUM",
  "OFF_SPIN", "LEG_SPIN", "LEFT_ARM_ORTHODOX", "LEFT_ARM_CHINAMAN", "NONE",
];

export default function AdminPlayersPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    role: "BATTER",
    battingStyle: "RIGHT_HAND",
    bowlingStyle: "NONE",
    country: "",
    image: "",
  });

  const { data: players = [], isLoading, isError, error } = useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const response = await apiClient.get("/players");
      const data = response.data?.data || response.data || [];
      return Array.isArray(data) ? data : data.players || [];
    },
  });

  const createMutation = useCreatePlayerMutation();
  const deleteMutation = useDeletePlayerMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync(formData);
      setFormData({
        name: "", shortName: "", role: "BATTER",
        battingStyle: "RIGHT_HAND", bowlingStyle: "NONE",
        country: "", image: "",
      });
      setShowForm(false);
    } catch (err) {
      console.error("Failed to create player:", err);
    }
  };

  const handleDelete = async (playerId) => {
    if (!window.confirm("Are you sure you want to delete this player?")) return;
    try {
      await deleteMutation.mutateAsync(playerId);
    } catch (err) {
      console.error("Failed to delete player:", err);
    }
  };

  const roleColors = {
    BATTER: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    BOWLER: "bg-red-500/15 text-red-400 border-red-500/20",
    ALL_ROUNDER: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    WICKET_KEEPER: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#94d5a5]">Management</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Players</h1>
          <p className="mt-1 text-sm text-[#aeb8b0]">Create and manage cricket players.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#94d5a5] text-[#06361f] font-bold text-sm hover:brightness-110 transition-all"
        >
          <Plus className="h-4 w-4" />
          {showForm ? "Cancel" : "Create Player"}
        </button>
      </div>

      {/* Create Player Form */}
      {showForm && (
        <div className="mb-8 rounded-xl border border-[#94d5a5]/20 bg-[#11171b] p-6">
          <h2 className="text-lg font-bold text-white mb-4">New Player</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">Player Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0b1013] border border-white/10 text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors"
                placeholder="e.g. Virat Kohli"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">Short Name</label>
              <input
                type="text"
                value={formData.shortName}
                onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0b1013] border border-white/10 text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors"
                placeholder="e.g. V. Kohli"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0b1013] border border-white/10 text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors"
                placeholder="e.g. India"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">Role *</label>
              <select
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0b1013] border border-white/10 text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors"
              >
                {PLAYER_ROLES.map((r) => <option key={r} value={r}>{r.replace("_", " ")}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">Batting Style</label>
              <select
                value={formData.battingStyle}
                onChange={(e) => setFormData({ ...formData, battingStyle: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0b1013] border border-white/10 text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors"
              >
                {BATTING_STYLES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">Bowling Style</label>
              <select
                value={formData.bowlingStyle}
                onChange={(e) => setFormData({ ...formData, bowlingStyle: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0b1013] border border-white/10 text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors"
              >
                {BOWLING_STYLES.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0b1013] border border-white/10 text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors"
                placeholder="https://example.com/player.png"
              />
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
                {createMutation.isPending ? "Creating..." : "Create Player"}
              </button>
            </div>
            {createMutation.isError && (
              <div className="md:col-span-2 flex items-center gap-2 text-red-400 text-sm bg-red-500/10 rounded-lg px-4 py-3">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {createMutation.error?.response?.data?.message || createMutation.error?.message || "Failed to create player"}
              </div>
            )}
            {createMutation.isSuccess && (
              <div className="md:col-span-2 flex items-center gap-2 text-[#94d5a5] text-sm bg-[#94d5a5]/10 rounded-lg px-4 py-3">
                <Check className="h-4 w-4 shrink-0" />
                Player created successfully!
              </div>
            )}
          </form>
        </div>
      )}

      {/* Players List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20 gap-3">
          <Loader2 className="h-6 w-6 text-[#94d5a5] animate-spin" />
          <p className="text-sm text-[#aeb8b0]">Loading players...</p>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center py-20 gap-3">
          <AlertCircle className="h-8 w-8 text-red-400" />
          <p className="text-sm text-red-400">{error?.message || "Failed to load players"}</p>
        </div>
      ) : players.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <UserPlus className="h-12 w-12 text-[#94d5a5] opacity-40" />
          <p className="text-sm font-semibold text-[#aeb8b0]">No players yet</p>
          <p className="text-xs text-[#6b7a72]">Create your first player to get started.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {players.map((player) => (
            <div
              key={player._id}
              className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-[#11171b] hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0b1013] border border-white/10 flex items-center justify-center font-bold text-lg text-white overflow-hidden">
                  {player.image ? (
                    <img src={player.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    player.name?.charAt(0) || "?"
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{player.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${roleColors[player.role] || "bg-white/5 text-gray-400 border-white/10"}`}>
                      {player.role?.replace("_", " ") || "N/A"}
                    </span>
                    {player.country && (
                      <span className="text-[10px] text-[#aeb8b0]">{player.country}</span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDelete(player._id)}
                className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                title="Delete player"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
