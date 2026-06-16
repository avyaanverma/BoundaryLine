import { useState } from "react";
import HeroSection from "../component/HeroSection";
import SearchFilters from "../component/SearchFilter";
import TeamGrid from "../component/TeamGrid";
import { teams } from "../hook/Teamdata";
import Navbar from "../../../shared/component/NavBar";
import PageFooter from "../../../shared/component/PagesFooter";

function TeamPage() {
    const [search, setSearch] = useState("");
    const [tournament, setTournament] = useState("All");
    const [ranking, setRanking] = useState("10");
    const [format, setFormat] = useState("All");

    const filteredTeams = teams.filter((team) => {
        const searchMatch =
            team.name.toLowerCase().includes(search.toLowerCase()) ||
            team.captain.toLowerCase().includes(search.toLowerCase());

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
        <div className="min-h-screen bg-[#070b12]">

            {/* Navbar */}
            <Navbar />

            {/* Page Content */}
            <main className="pt-20">

                <div className="max-w-[1420px] mx-auto px-4 lg:px-6 py-8">

                    {/* Hero */}
                    <HeroSection />

                    {/* Filters */}
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

                    {/* Team Grid */}
                    <div className="mt-8">
                        <TeamGrid teams={filteredTeams} />
                    </div>

                </div>

            </main>

            {/* Footer */}
            <PageFooter />

        </div>
    );
}

export default TeamPage;