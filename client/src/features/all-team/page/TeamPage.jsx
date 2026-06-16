import { useState, useMemo } from "react";
import HeroSection from "../components/HeroSection";
import SearchFilters from "../components/SearchFilter";
import TeamGrid from "../components/TeamGrid";
import Navbar from "../../../shared/components/NavBar";
import PageFooter from "../../../shared/components/PagesFooter";
import { useTeamsQuery } from "../../../shared/hooks/useQueries.js";
import { Loader2, AlertCircle } from "lucide-react";

function TeamPage() {
    const [search, setSearch] = useState("");
    const [tournament, setTournament] = useState("All");
    const [ranking, setRanking] = useState("10");
    const [format, setFormat] = useState("All");

    const { data: teams = [], isLoading, isError, error } = useTeamsQuery();

    const filteredTeams = useMemo(() => {
        if (!teams || teams.length === 0) return [];

        return teams.filter((team) => {
            const searchMatch =
                !search ||
                team.name?.toLowerCase().includes(search.toLowerCase()) ||
                team.shortName?.toLowerCase().includes(search.toLowerCase());

            const rankingMatch =
                ranking === "All" || ranking === "10" || ranking === "20" || !team.rank;

            return searchMatch && rankingMatch;
        });
    }, [teams, search, ranking]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#070b12]">
                <Navbar />
                <main className="pt-20">
                    <div className="max-w-[1420px] mx-auto px-4 lg:px-6 py-8">
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="w-8 h-8 text-[#94d5a5] animate-spin" />
                            <p className="text-[#c0c9bf] text-sm font-semibold">Loading teams...</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-[#070b12]">
                <Navbar />
                <main className="pt-20">
                    <div className="max-w-[1420px] mx-auto px-4 lg:px-6 py-8">
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <AlertCircle className="w-10 h-10 text-red-400" />
                            <p className="text-red-400 text-sm font-semibold">Failed to load teams</p>
                            <p className="text-[#8a938a] text-xs">{error?.message || "Please check your connection."}</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#070b12]">
            <Navbar />
            <main className="pt-20">
                <div className="max-w-[1420px] mx-auto px-4 lg:px-6 py-8">
                    <HeroSection />

                    {teams.length > 0 && (
                        <>
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
                        </>
                    )}

                    {teams.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <p className="text-[#c0c9bf] text-sm font-semibold">No teams found</p>
                            <p className="text-[#8a938a] text-xs">Teams will appear here once they are created.</p>
                        </div>
                    )}
                </div>
            </main>
            <PageFooter />
        </div>
    );
}

export default TeamPage;