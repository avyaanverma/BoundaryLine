import { useSelector } from "react-redux";

export const ScorecardTab = () => {
  const match = useSelector((state) => state.match.currentMatch);
  const activeInnings = match.innings[match.currentInningsNum - 1];
  return (
    <div className="flex flex-col gap-6 font-sans">
      {/* Batting Scorecard Card */}
      <div className="rounded-xl bg-zinc-950/40 border border-white/5 overflow-hidden">
        <div className="bg-zinc-900 px-4 py-3 border-b border-white/5 flex justify-between items-center">
          <span className="text-sm font-semibold text-white">
            {activeInnings.teamName} Batting
          </span>
          <span className="text-xs font-mono font-bold text-emerald-400">
            {activeInnings.runs}/{activeInnings.wickets} ({activeInnings.overs}.
            {activeInnings.balls} Overs)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-zinc-500 font-medium">
                <th className="px-4 py-3">Batter</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">R</th>
                <th className="px-4 py-3 text-right">B</th>
                <th className="px-4 py-3 text-right">4s</th>
                <th className="px-4 py-3 text-right">6s</th>
                <th className="px-4 py-3 text-right">SR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {activeInnings.batters.map((b) => {
                const sr =
                  b.battingStats && b.battingStats.balls > 0
                    ? (
                        (b.battingStats.runs / b.battingStats.balls) *
                        100
                      ).toFixed(1)
                    : "0.0";
                const isStriking = match.activeBatter1Id === b.playerId;

                return (
                  <tr
                    key={b.playerId}
                    className={`hover:bg-white/5 transition-colors duration-150 ${isStriking ? "bg-emerald-950/20" : ""}`}
                  >
                    <td className="px-4 py-3.5 font-medium text-white flex items-center gap-1.5">
                      {b.name}
                      {isStriking && (
                        <span className="text-emerald-400 font-extrabold animate-pulse">
                          *
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-zinc-500 leading-normal">
                      {b.battingStats?.isOut ? (
                        b.battingStats.howOut || "Out"
                      ) : (
                        <span className="text-emerald-400 font-medium">
                          Batting
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono font-bold text-white">
                      {b.battingStats?.runs || 0}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-zinc-400">
                      {b.battingStats?.balls || 0}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-zinc-400">
                      {b.battingStats?.fours || 0}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-zinc-400">
                      {b.battingStats?.sixes || 0}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono font-semibold text-zinc-400">
                      {sr}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Extras & Totals Bar */}
        <div className="bg-zinc-900/60 p-4 border-t border-white/5 flex flex-wrap gap-x-6 gap-y-2 justify-between text-xs font-sans">
          <div className="text-zinc-400 flex gap-2">
            <span className="font-semibold text-zinc-300">Extras:</span>
            <span className="font-mono">
              {activeInnings.extras.total} (Wd {activeInnings.extras.wides}, Nb{" "}
              {activeInnings.extras.noBalls}, B {activeInnings.extras.byes}, Lb{" "}
              {activeInnings.extras.legByes})
            </span>
          </div>
          <div className="text-zinc-400">
            <span className="font-semibold text-zinc-300">Yet to bat:</span>{" "}
            {activeInnings.batters
              .filter(
                (b) =>
                  b.playerId !== match.activeBatter1Id &&
                  b.playerId !== match.activeBatter2Id &&
                  !b.battingStats?.isOut &&
                  (!b.battingStats ||
                    (b.battingStats.runs === 0 && b.battingStats.balls === 0)),
              )
              .map((b) => b.name)
              .join(", ") || "None"}
          </div>
        </div>
      </div>

      {/* Bowling Scorecard Card */}
      <div className="rounded-xl bg-zinc-950/40 border border-white/5 overflow-hidden">
        <div className="bg-zinc-900 px-4 py-3 border-b border-white/5 text-sm font-semibold text-white">
          {activeInnings.teamId === match.teamA.id
            ? match.teamB.name
            : match.teamA.name}{" "}
          Bowling
        </div>

        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/5 text-zinc-500 font-medium">
              <th className="px-4 py-3">Bowler</th>
              <th className="px-4 py-3 text-right">O</th>
              <th className="px-4 py-3 text-right">M</th>
              <th className="px-4 py-3 text-right">R</th>
              <th className="px-4 py-3 text-right">W</th>
              <th className="px-4 py-3 text-right">ECON</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {activeInnings.bowlers.map((b) => {
              const totalOvers = b.bowlingStats
                ? `${b.bowlingStats.overs}.${b.bowlingStats.balls}`
                : "0.0";
              const totalOversFloat = b.bowlingStats
                ? b.bowlingStats.overs + b.bowlingStats.balls / 6
                : 0;
              const econ =
                b.bowlingStats && totalOversFloat > 0
                  ? (b.bowlingStats.runsConceded / totalOversFloat).toFixed(2)
                  : "0.00";
              const isActive = match.activeBowlerId === b.playerId;

              return (
                <tr
                  key={b.playerId}
                  className={`hover:bg-white/5 transition-colors duration-150 ${isActive ? "bg-cyan-950/20" : ""}`}
                >
                  <td className="px-4 py-3.5 font-medium text-white flex items-center gap-1.5">
                    {b.name}
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-white">
                    {totalOvers}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-zinc-400">
                    {b.bowlingStats?.maidens || 0}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono font-bold text-rose-400">
                    {b.bowlingStats?.runsConceded || 0}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono font-bold text-emerald-400">
                    {b.bowlingStats?.wickets || 0}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono font-semibold text-zinc-400">
                    {econ}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScorecardTab;
