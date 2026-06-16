import { useSelector, useDispatch } from "react-redux";
import { setActiveMatch } from "../store/mathSlice.js";
import { useSocket } from "../../../shared/services/socket/useSocket.js";
import { Wifi, WifiOff } from "lucide-react";
import PremiumSelect from "../../scorer-console/components/PremiumSelect.jsx";
export const LiveMatchHeader = () => {
  const dispatch = useDispatch();
  const activeMatchId = useSelector((state) => state.match.activeMatchId);
  const matchesList = useSelector((state) => state.match.matchesList || []);
  const isSynced = useSelector((state) => state.match.isSynced);
  const { isConnected } = useSocket();

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl glass-card mb-6 border border-white/5">
      <div className="flex items-center gap-4">
        {/* Brand Header */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold font-display bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
            BoundaryLine
          </span>
          <div className="h-5 w-[1px] bg-white/20 hidden sm:block"></div>
        </div>

        {/* Match Select */}
        <div className="flex items-center gap-2 min-w-[220px]">
          <PremiumSelect
            id="match-selector"
            value={activeMatchId}
            onChange={(val) => dispatch(setActiveMatch(val))}
            options={matchesList.map((m) => ({
              id: m.id,
              name: `${m.teamA.name} vs ${m.teamB.name}`,
              role: m.subtitle || "T20",
            }))}
            teamColorTheme="emerald"
            placeholder="Select Active Match"
          />
          <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-bold tracking-widest bg-red-950/40 border border-red-500/20 text-red-400 uppercase animate-pulse shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
            Live
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs font-sans text-gray-400">
        <div className="flex items-center gap-2">
          {isConnected ? (
            <span className="flex items-center gap-1 text-emerald-400 font-medium bg-emerald-950/35 px-2.5 py-1 rounded-lg border border-emerald-500/10">
              <Wifi className="w-3.5 h-3.5" />
              Socket Connected
            </span>
          ) : (
            <span className="flex items-center gap-1 text-yellow-500 font-medium bg-yellow-950/35 px-2.5 py-1 rounded-lg border border-yellow-500/10">
              <WifiOff className="w-3.5 h-3.5" />
              Socket Offline
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isSynced ? (
            <span className="flex items-center gap-1 bg-zinc-850 px-2.5 py-1 rounded-lg text-emerald-400 font-semibold uppercase border border-emerald-500/10">
              ⚡ Synced
            </span>
          ) : (
            <span className="flex items-center gap-1 bg-zinc-850 px-2.5 py-1 rounded-lg text-yellow-500 font-semibold uppercase border border-yellow-500/10 animate-pulse">
              ☁ Pending Save
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveMatchHeader;
