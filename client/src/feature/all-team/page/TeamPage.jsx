import { useState } from "react";
import HeroSection from "../component/HeroSection";
import SearchFilters from "../component/SearchFilter";
import TeamGrid from "../component/TeamGrid";
import { teams } from "../hook/Teamdata";

function TeamPage() {
    const [search, setSearch] = useState("");
    const [tournament, setTournament] = useState("All");
    const [ranking, setRanking] = useState("10");
    const [format, setFormat] = useState("All");

    const filteredTeams = teams.filter((team) => {
        const searchMatch =
            team.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            team.captain
                .toLowerCase()
                .includes(search.toLowerCase());

        const tournamentMatch =
            tournament === "All" ||
            team.tournament === tournament;

        const formatMatch =
            format === "All" ||
            team.format === format;

        const rankingMatch =
            ranking === "All" ||
            team.rank <= Number(ranking);

        return (
            searchMatch &&
            tournamentMatch &&
            formatMatch &&
            rankingMatch
        );
    });
    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-[1450px] mx-auto px-6 py-8">

                <HeroSection />

                <div className="mt-8">
                    <SearchFilters
                        search={search}
                        setSearch={setSearch}
                        tournament={tournament}
                        setTournament={setTournament}
                        ranking={ranking}
                        setRanking={setRanking}
                        format={format}
                        setFormat={setFormat}

                    />
                </div>

                <div className="mt-8">
                    <TeamGrid teams={filteredTeams} />
                </div>

            </div>
        </div>
    );
}

export default TeamPage;