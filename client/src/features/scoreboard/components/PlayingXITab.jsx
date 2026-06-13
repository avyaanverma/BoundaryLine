import { useSelector } from "react-redux";
import { User, Sword, Shield } from "lucide-react";

export const PlayingXITab = () => {
  const match = useSelector((state) => state.match.currentMatch);
  const activeInnings = match.innings[match.currentInningsNum - 1];

  // Batters are the batting team, bowlers list has the bowling squad
  const teamAPlayers = activeInnings.batters;
  const teamBPlayers = activeInnings.bowlers;

  // Fallback if squads are empty (e.g., initial load before setup)
  const defaultPlayersA = [
    { name: "Rohit Sharma", role: "BATTER" },
    { name: "Ishan Kishan", role: "WICKET_KEEPER" },
    { name: "Suryakumar Yadav", role: "BATTER" },
    { name: "Hardik Pandya", role: "ALL_ROUNDER" },
    { name: "Virat Kohli", role: "BATTER" },
    { name: "Ravindra Jadeja", role: "ALL_ROUNDER" },
    { name: "Jasprit Bumrah", role: "BOWLER" },
  ];
  const defaultPlayersB = [
    { name: "Travis Head", role: "BATTER" },
    { name: "David Warner", role: "BATTER" },
    { name: "Mitchell Marsh", role: "ALL_ROUNDER" },
    { name: "Pat Cummins", role: "BOWLER" },
    { name: "Mitchell Starc", role: "BOWLER" },
    { name: "Adam Zampa", role: "BOWLER" },
  ];

  const dispAPlayers = teamAPlayers.length > 0 ? teamAPlayers : defaultPlayersA;
  const dispBPlayers = teamBPlayers.length > 0 ? teamBPlayers : defaultPlayersB;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
      {/* Team A Lineup */}
      <div className="p-4 rounded-xl bg-zinc-950/40 border border-white/5">
        <h3 className="text-xs font-bold tracking-wider text-emerald-400 uppercase mb-3 flex items-center gap-1.5">
          <Sword className="w-4 h-4" /> {match.teamA.name} PLAYING SQUAD
        </h3>
        <p className="text-[11px] text-zinc-500 mb-4">Official list of starting batters & fielders</p>
        
        <div className="flex flex-col gap-2">
          {dispAPlayers.map((player, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors duration-150"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-white">
                  {player.name}
                </span>
              </div>
              <span className="text-[10px] font-mono font-medium text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-white/5 uppercase">
                {player.role || "BATTER"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Team B Lineup */}
      <div className="p-4 rounded-xl bg-zinc-950/40 border border-white/5">
        <h3 className="text-xs font-bold tracking-wider text-cyan-400 uppercase mb-3 flex items-center gap-1.5">
          <Shield className="w-4 h-4" /> {match.teamB.name} PLAYING SQUAD
        </h3>
        <p className="text-[11px] text-zinc-500 mb-4">Official list of starting bowlers & fielders</p>
        
        <div className="flex flex-col gap-2">
          {dispBPlayers.map((player, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors duration-150"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-white">
                  {player.name}
                </span>
              </div>
              <span className="text-[10px] font-mono font-medium text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-white/5 uppercase">
                {player.role || "BOWLER"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayingXITab;
