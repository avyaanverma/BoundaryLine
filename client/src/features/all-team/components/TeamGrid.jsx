import TeamCard from "./TeamCard";

function TeamGrid({ teams }) {
  return (
    <div
      className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
            "
    >
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
}

export default TeamGrid;
