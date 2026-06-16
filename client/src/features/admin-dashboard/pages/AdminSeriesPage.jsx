import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCreateSeriesMutation } from "../api/adminMutations.js";
import apiClient from "../../../shared/lib/axios.js";
import {
  ListOrdered,
  Plus,
  Loader2,
  AlertCircle,
  Check,
} from "lucide-react";

export default function AdminSeriesPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    seriesType: "BI_LATERAL",
    startDate: "",
    endDate: "",
  });

  const { data: series = [], isLoading, isError, error } = useQuery({
    queryKey: ["series"],
    queryFn: async () => {
      const response = await apiClient.get("/series");
      const data = response.data?.data || response.data || [];
      return Array.isArray(data) ? data : data.series || [];
    },
  });

  const createMutation = useCreateSeriesMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync({
        ...formData,
        startDate: formData.startDate ? new Date(formData.startDate) : undefined,
        endDate: formData.endDate ? new Date(formData.endDate) : undefined,
      });
      setFormData({ name: "", shortName: "", seriesType: "BI_LATERAL", startDate: "", endDate: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Failed to create series:", err);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#94d5a5]">Management</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Series</h1>
          <p className="mt-1 text-sm text-[#aeb8b0]">Create and manage cricket series and tournaments.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#94d5a5] text-[#06361f] font-bold text-sm hover:brightness-110 transition-all"
        >
          <Plus className="h-4 w-4" />
          {showForm ? "Cancel" : "Create Series"}
        </button>
      </div>

      {/* Create Series Form */}
      {showForm && (
        <div className="mb-8 rounded-xl border border-[#94d5a5]/20 bg-[#11171b] p-6">
          <h2 className="text-lg font-bold text-white mb-4">New Series</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">Series Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0b1013] border border-white/10 text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors"
                placeholder="e.g. ICC Cricket World Cup 2024"
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
                placeholder="e.g. CWC24"
                maxLength={10}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">Series Type</label>
              <select
                value={formData.seriesType}
                onChange={(e) => setFormData({ ...formData, seriesType: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0b1013] border border-white/10 text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors"
              >
                <option value="BI_LATERAL">Bilateral</option>
                <option value="TOURNAMENT">Tournament</option>
                <option value="LEAGUE">League</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0b1013] border border-white/10 text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#aeb8b0] mb-1.5">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0b1013] border border-white/10 text-white text-sm focus:border-[#94d5a5]/50 focus:outline-none transition-colors"
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
                {createMutation.isPending ? "Creating..." : "Create Series"}
              </button>
            </div>
            {createMutation.isError && (
              <div className="md:col-span-2 flex items-center gap-2 text-red-400 text-sm bg-red-500/10 rounded-lg px-4 py-3">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {createMutation.error?.response?.data?.message || createMutation.error?.message || "Failed to create series"}
              </div>
            )}
            {createMutation.isSuccess && (
              <div className="md:col-span-2 flex items-center gap-2 text-[#94d5a5] text-sm bg-[#94d5a5]/10 rounded-lg px-4 py-3">
                <Check className="h-4 w-4 shrink-0" />
                Series created successfully!
              </div>
            )}
          </form>
        </div>
      )}

      {/* Series List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20 gap-3">
          <Loader2 className="h-6 w-6 text-[#94d5a5] animate-spin" />
          <p className="text-sm text-[#aeb8b0]">Loading series...</p>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center py-20 gap-3">
          <AlertCircle className="h-8 w-8 text-red-400" />
          <p className="text-sm text-red-400">{error?.message || "Failed to load series"}</p>
        </div>
      ) : series.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <ListOrdered className="h-12 w-12 text-[#94d5a5] opacity-40" />
          <p className="text-sm font-semibold text-[#aeb8b0]">No series yet</p>
          <p className="text-xs text-[#6b7a72]">Create your first series to get started.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {series.map((s) => (
            <div
              key={s._id}
              className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-[#11171b] hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#94d5a5]/10 border border-[#94d5a5]/20 flex items-center justify-center font-bold text-lg text-[#94d5a5]">
                  {s.shortName?.slice(0, 2) || "?"}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{s.name}</p>
                  <p className="text-xs text-[#aeb8b0]">
                    {s.shortName}
                    {s.seriesType ? ` • ${s.seriesType.replace("_", " ")}` : ""}
                    {s.startDate ? ` • ${new Date(s.startDate).toLocaleDateString()}` : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
