import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../shared/lib/axios.js";
import Navbar from "../../../shared/components/NavBar";
import { useTournamentDetailQuery, useMatchesQuery } from "../../../shared/hooks/useQueries.js";
import { Trophy, ChevronLeft, Calendar, Shield, Loader2, AlertCircle, UserPlus } from "lucide-react";

export function TournamentDetailPage() {
  const { tournamentId } = useParams();
  const navigate = useNavigate();
  const { data: tournament, isLoading, isError } = useTournamentDetailQuery(tournamentId);
  const { data: matches = [] } = useMatchesQuery();
  const user = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();
  const [scorerEmail, setScorerEmail] = useState("");
  const [isAddingScorer, setIsAddingScorer] = useState(false);
  const isOwner = String(tournament?.createdBy?._id || tournament?.createdBy || "") === String(user?._id || user?.id || "");

  const addScorer = async (event) => {
    event.preventDefault();
    if (!scorerEmail.trim()) return;
    setIsAddingScorer(true);
    try {
      await apiClient.post(`/private/tournaments/${tournamentId}/scorers`, { email: scorerEmail.trim() });
      setScorerEmail("");
      queryClient.invalidateQueries({ queryKey: ["tournament", tournamentId] });
    } finally {
      setIsAddingScorer(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070b12] text-white flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
        <p className="text-zinc-400 text-sm">Loading tournament details...</p>
      </div>
    );
  }

  if (isError || !tournament) {
    return (
      <div className="min-h-screen bg-[#070b12] text-white flex flex-col items-center justify-center gap-4 p-8">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <p className="text-red-400 text-sm font-semibold">Tournament Not Found</p>
        <button
          onClick={() => navigate("/tournaments")}
          className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400"
        >
          Back to Tournaments
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b12] text-white flex flex-col font-sans">
      <Navbar />

      <main className="pt-24 pb-16 px-6 max-w-[1440px] mx-auto w-full flex-1">
        {/* Navigation & Header */}
        <button
          onClick={() => navigate("/tournaments")}
          className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 text-xs font-bold transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> BACK TO TOURNAMENTS
        </button>

        <div className="p-8 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-zinc-950 border border-white/10 shadow-2xl relative overflow-hidden mb-10">
          <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              {tournament.format || "T20"}
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs font-semibold uppercase">
              STATUS: {tournament.status || "UPCOMING"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            {tournament.name}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-300 font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>
                {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>{tournament.teams?.length || 0} Participating Teams</span>
            </div>
          </div>
        </div>

        {isOwner && (
          <form onSubmit={addScorer} className="mb-10 p-5 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col sm:flex-row gap-3 sm:items-end">
            <div className="flex-1">
              <label className="text-xs font-bold uppercase text-zinc-400">Authorize a scorer</label>
              <input value={scorerEmail} onChange={(event) => setScorerEmail(event.target.value)} type="email" required placeholder="scorer@example.com" className="mt-2 w-full rounded-xl bg-zinc-950 border border-white/10 px-4 py-3 text-sm outline-none focus:border-emerald-500" />
            </div>
            <button disabled={isAddingScorer} className="px-5 py-3 rounded-xl bg-emerald-500 text-black font-bold text-sm disabled:opacity-60 inline-flex gap-2 items-center justify-center"><UserPlus className="w-4 h-4" />{isAddingScorer ? "Authorizing..." : "Authorize scorer"}</button>
          </form>
        )}

        {/* Tournament Fixtures & Standings Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-emerald-400" /> Tournament Matches
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matches.length === 0 ? (
              <p className="text-zinc-500 text-sm">No matches scheduled for this tournament yet.</p>
            ) : (
              matches.slice(0, 4).map((m) => (
                <div
                  key={m._id}
                  onClick={() => navigate(`/matches/${m._id}`)}
                  className="p-5 rounded-2xl bg-zinc-950/60 border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer flex justify-between items-center"
                >
                  <div>
                    <p className="text-xs font-semibold text-zinc-500 uppercase">{m.venue}</p>
                    <p className="text-base font-bold text-white mt-1">{m.title}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                    {m.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TournamentDetailPage;
