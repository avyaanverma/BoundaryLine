import { useNavigate } from "react-router";
import { Eye } from "lucide-react";

const getTeamName = (team) => {
  if (!team) return "TBD";
  if (typeof team === "string") return team;
  return team.shortName || team.name || "TBD";
};

const formatDate = (value) => {
  if (!value) return "Not scheduled";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not scheduled";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const statusClasses = {
  LIVE: "bg-[#ffb3ad]/10 text-[#ffb3ad]",
  INNINGS_BREAK: "bg-[#ffb3ad]/10 text-[#ffb3ad]",
  COMPLETED: "bg-[#8fd3ff]/10 text-[#8fd3ff]",
  UPCOMING: "bg-[#94d5a5]/10 text-[#94d5a5]",
};

export const AdminRecentMatches = ({ matches = [] }) => {
  const navigate = useNavigate();

  return (
    <section className="rounded-lg border border-white/10 bg-[#11171b] p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9aa7a0]">
            Recent Matches
          </p>
          <h2 className="mt-2 text-xl font-bold text-white">Match Queue</h2>
        </div>
        <span className="text-sm font-semibold text-[#94d5a5]">
          {matches.length} visible
        </span>
      </div>

      <div className="overflow-hidden rounded-lg border border-white/10">
        <div className="hidden grid-cols-[1.4fr_0.6fr_0.8fr_0.6fr] bg-[#0b1013] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#9aa7a0] md:grid">
          <span>Fixture</span>
          <span>Status</span>
          <span>Start</span>
          <span className="text-right">Scoreboard</span>
        </div>

        {matches.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-[#aeb8b0]">
            No match records found.
          </div>
        ) : (
          matches.map((match) => (
            <div
              className="grid gap-3 border-t border-white/10 px-4 py-4 md:grid-cols-[1.4fr_0.6fr_0.8fr_0.6fr] md:items-center"
              key={match._id}
            >
              <div>
                <p className="font-semibold text-white">
                  {getTeamName(match.team1)} vs {getTeamName(match.team2)}
                </p>
                <p className="mt-1 text-xs text-[#9aa7a0]">
                  {match.venue || "Venue pending"}
                </p>
              </div>
              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${statusClasses[match.status] ?? statusClasses.UPCOMING}`}
              >
                {match.status ?? "UPCOMING"}
              </span>
              <span className="text-sm text-[#cbd4cd]">
                {formatDate(match.startTime)}
              </span>
              <div className="flex justify-end">
                <button
                  onClick={() => navigate(`/matches/${match._id}`)}
                  className="p-2 rounded-lg hover:bg-[#94d5a5]/10 text-[#94d5a5] transition-colors"
                  title="View Scoreboard"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
