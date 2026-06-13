import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootProvider } from "../../../app/providers/RootProviders.jsx";
import { setRole, logout } from "../../../app/store/index.js";
import { UserRole } from "./type.js";
import ScoreboardPage from "../../scoreboard/pages/ScoreBoard.jsx";
import ScorerConsolePage from "./ScorerConsolePage.jsx";
import { RoleGuard } from "../../../app/guards/RoleGuard.jsx";
import { Users, Layout } from "lucide-react";

const BoundaryLineApp = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, role, user } = useSelector((state) => state.auth);
  // Active view router: "SCOREBOARD" or "SCORER_CONSOLE"
  const [activeLayout, setActiveLayout] = useState("SCORER_CONSOLE");

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white relative">
      
      {/* FLOATING DEVELOPER CONTROL TOOLBAR */}
      <div className="bg-zinc-900 border-b border-rose-500/10 px-4 py-2.5 flex items-center justify-between flex-wrap gap-4 text-xs font-mono relative z-50">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping"></span>
          <span className="text-rose-400 font-bold uppercase tracking-wider">BoundaryLine RBAC Dev Panel</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">Owner Email:</span>
          <span className="text-zinc-300 font-semibold underline">ommhatre379@gmail.com</span>
        </div>

        <div className="flex items-center gap-3.5 flex-wrap">
          {/* Quick privilege toggle */}
          <div className="flex items-center gap-1.5 bg-zinc-950 px-2.5 py-1 rounded-md border border-white/5">
            <Users className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-400 font-sans pr-1">Pre-select Role:</span>
            {["SCORER", "ADMIN", "SUPER_ADMIN"].map((r) => (
              <button
                key={r}
                onClick={() => dispatch(setRole(UserRole[r]))}
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all ${
                  role === r
                    ? "bg-rose-500 text-white font-extrabold"
                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Quick layouts toggles */}
          <div className="flex items-center gap-1.5 bg-zinc-950 px-2.5 py-1 rounded-md border border-white/5">
            <Layout className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-400 font-sans pr-1">Layout:</span>
            <button
              onClick={() => setActiveLayout("SCOREBOARD")}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                activeLayout === "SCOREBOARD"
                  ? "bg-emerald-500 text-black font-extrabold"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              Scoreboard Base
            </button>
            <button
              onClick={() => setActiveLayout("SCORER_CONSOLE")}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                activeLayout === "SCORER_CONSOLE"
                  ? "bg-emerald-500 text-black font-extrabold"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              Scorer Console
            </button>
          </div>
        </div>
      </div>

      {/* PRIMARY ACTIVE CLIENT PAGES VIEWPORTS */}
      <main className="flex-1">
        {activeLayout === "SCOREBOARD" && <ScoreboardPage />}
        
        {activeLayout === "SCORER_CONSOLE" && (
          <RoleGuard allowedRoles={[UserRole.SCORER, UserRole.ADMIN, UserRole.SUPER_ADMIN]}>
            <ScorerConsolePage onViewScoreboard={() => setActiveLayout("SCOREBOARD")} />
          </RoleGuard>
        )}
      </main>

      {/* FOOTER METRIC BRANDING */}
      <footer className="py-8 bg-zinc-950 border-t border-white/5 text-center text-zinc-500 text-xs font-sans">
        <p className="tracking-wide">© 2026 BoundaryLine Inc. All rights reserved. Platform Certified for Scorer Consoles.</p>
        <p className="text-[10px] text-zinc-700 mt-2 font-mono">
          Vite Config Port 3000 Ingress Routing Active
        </p>
      </footer>

    </div>
  );
};

export default function ScorerWorkspace() {
  return (
    <RootProvider>
      <BoundaryLineApp />
    </RootProvider>
  );
}
