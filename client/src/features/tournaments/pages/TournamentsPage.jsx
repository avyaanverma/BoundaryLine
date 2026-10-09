import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Navbar from "../../../shared/components/NavBar";
import { useTournamentsQuery } from "../../../shared/hooks/useQueries.js";
import CreateTournamentModal from "../components/CreateTournamentModal.jsx";
import { Trophy, Plus, Calendar, Shield, Loader2, AlertCircle } from "lucide-react";

export function TournamentsPage() {
  const navigate = useNavigate();
  const { data: tournaments = [], isLoading, isError } = useTournamentsQuery();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070b12] text-white flex flex-col font-sans">
      <Navbar />

      <main className="pt-24 pb-16 px-6 max-w-[1440px] mx-auto w-full flex-1">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Trophy className="w-6 h-6" />
              </div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">
                Tournaments & Leagues
              </h1>
            </div>
            <p className="text-zinc-400 text-sm max-w-xl">
              Browse grassroot leagues, corporate cups, academy tournaments, and bilateral series.
            </p>
          </div>

          <div>
            {isAuthenticated ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Create Tournament
              </button>
            ) : (
              <button
                onClick={() => navigate("/userlogin")}
                className="px-6 py-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-emerald-500/40 text-zinc-300 hover:text-white font-bold text-sm transition-all cursor-pointer"
              >
                Sign In to Create Tournament
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
            <p className="text-zinc-400 text-sm font-semibold">Loading tournaments...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <AlertCircle className="w-10 h-10 text-red-400" />
            <p className="text-red-400 text-sm font-semibold">Failed to load tournaments</p>
          </div>
        ) : tournaments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center border border-dashed border-white/10 rounded-2xl bg-zinc-950/40">
            <Trophy className="w-12 h-12 text-zinc-600 mb-2" />
            <h3 className="text-xl font-bold text-white">No Tournaments Available</h3>
            <p className="text-zinc-400 text-sm max-w-md">
              There are no active tournaments yet. Be the first to organize a league or tournament!
            </p>
            {isAuthenticated && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Create Tournament Now
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((t) => (
              <div
                key={t._id}
                onClick={() => navigate(`/tournaments/${t._id}`)}
                className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer group hover:-translate-y-1 shadow-xl relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    {t.format || "T20"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 text-[11px] font-semibold border border-white/5 uppercase">
                    {t.status || "UPCOMING"}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-400 transition-colors mb-2">
                  {t.name}
                </h3>

                <div className="space-y-2 mt-4 text-xs text-zinc-400 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>
                      {new Date(t.startDate).toLocaleDateString()} - {new Date(t.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>{t.teams?.length || 0} Participating Teams</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                  <span className="text-xs font-extrabold text-emerald-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    VIEW DETAILS →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <CreateTournamentModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export default TournamentsPage;
