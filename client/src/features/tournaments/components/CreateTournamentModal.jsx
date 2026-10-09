import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../shared/lib/axios.js";
import { X, Trophy, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export function CreateTournamentModal({ onClose }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    name: "",
    format: "T20",
    startDate: "",
    endDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.startDate || !form.endDate) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      await apiClient.post("/private/tournaments", {
        name: form.name,
        format: form.format,
        startDate: new Date(form.startDate).toISOString(),
        endDate: new Date(form.endDate).toISOString(),
      });
      toast.success("Tournament created successfully!");
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to create tournament";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-white/10 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Create Tournament</h2>
            <p className="text-xs text-zinc-400">Organize a league or bilateral competition</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase">Tournament Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Grassroots Premier Cup 2026"
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase">Match Format</label>
            <select
              value={form.format}
              onChange={(e) => setForm({ ...form, format: e.target.value })}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500"
            >
              <option value="T20">T20</option>
              <option value="ODI">ODI</option>
              <option value="TEST">TEST</option>
              <option value="FIVER">5-Overs (FIVER)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase">Start Date</label>
              <input
                type="date"
                required
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase">End Date</label>
              <input
                type="date"
                required
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-zinc-400 hover:text-white text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? "Creating..." : "Create Tournament"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTournamentModal;
