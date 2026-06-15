import { Search } from "lucide-react";

const SearchFilter = ({
    search,
    setSearch,
    tournament,
    setTournament,
    ranking,
    setRanking,
    format,
    setFormat,
}) => {
    return (
        <div
            className="
            mt-8
            bg-[#1e2023]
            border border-[#262A35]
            rounded-xl
            px-6
            py-5
            flex
            items-center
            justify-between
            gap-6
            "
        >
            {/* Search */}
            <div className="flex items-center gap-4 flex-1">
                <Search
                    size={22}
                    className="text-gray-500"
                />

                <input
                    type="text"
                    placeholder="Search team or captain..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="
                    w-full
                    bg-transparent
                    outline-none
                    text-white
                    placeholder:text-gray-500
                    text-lg
                    "
                />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-6">

                <select
                    value={tournament}
                    onChange={(e) =>
                        setTournament(e.target.value)
                    }
                    className="
                    bg-transparent
                    text-gray-300
                    outline-none
                    cursor-pointer
                    "
                >
                    <option value="All">Tournament: All</option>
                    <option value="International">International</option>
                    <option value="IPL">IPL</option>
                    <option value="PSL">PSL</option>
                    <option value="BBL">BBL</option>
                    <option value="CPL">CPL</option>
                    <option value="The Hundred">The Hundred</option>
                    <option value="Ranji Trophy">Ranji Trophy</option>
                </select>

                <select
                    value={ranking}
                    onChange={(e) =>
                        setRanking(e.target.value)
                    }
                    className="
                    bg-transparent
                    text-gray-300
                    outline-none
                    cursor-pointer
                    "
                >
                    <option value="10">Ranking: Top 10</option>
                    <option value="5">Top 5</option>
                    <option value="20">Top 20</option>
                    <option value="All">All Teams</option>
                </select>

                <select
                    value={format}
                    onChange={(e) =>
                        setFormat(e.target.value)
                    }
                    className="
                    bg-transparent
                    text-gray-300
                    outline-none
                    cursor-pointer
                    "
                >
                    <option value="All">Format: All</option>
                    <option value="Test">Test</option>
                    <option value="ODI">ODI</option>
                    <option value="T20I">T20I</option>
                    <option value="T20">T20</option>
                    <option value="First Class">First Class</option>
                    <option value="List A">List A</option>
                </select>

            </div>
        </div>
    );
};

export default SearchFilter;