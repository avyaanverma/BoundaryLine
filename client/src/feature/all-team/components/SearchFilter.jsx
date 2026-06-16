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
                rounded-3xl
                border border-[#94d5a5]/10
                bg-gradient-to-br
                from-[#11161c]
                via-[#151b20]
                to-[#11161c]
                p-4
                md:p-5
            "
        >
            <div
                className="
                    flex
                    flex-col
                    xl:flex-row
                    gap-4
                    xl:items-center
                "
            >
                {/* Search */}
                <div
                    className="
                        flex
                        items-center
                        gap-3
                        flex-1
                        h-12
                        px-4
                        rounded-2xl
                        bg-[#1b2229]
                        border border-white/5
                    "
                >
                    <Search
                        size={18}
                        className="text-[#94d5a5]"
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
                            text-sm
                            placeholder:text-gray-500
                        "
                    />
                </div>

                {/* Filters */}
                <div
                    className="
                        grid
                        grid-cols-1
                        sm:grid-cols-3
                        gap-3
                    "
                >
                    <select
                        value={tournament}
                        onChange={(e) =>
                            setTournament(e.target.value)
                        }
                        className="
                            h-12
                            px-4
                            rounded-2xl
                            bg-[#1b2229]
                            border border-white/5
                            text-gray-300
                            text-sm
                            outline-none
                            cursor-pointer
                        "
                    >
                        <option value="All">
                            Tournament: All
                        </option>
                        <option value="International">
                            International
                        </option>
                        <option value="IPL">IPL</option>
                        <option value="PSL">PSL</option>
                        <option value="BBL">BBL</option>
                        <option value="CPL">CPL</option>
                        <option value="The Hundred">
                            The Hundred
                        </option>
                        <option value="Ranji Trophy">
                            Ranji Trophy
                        </option>
                    </select>

                    <select
                        value={ranking}
                        onChange={(e) =>
                            setRanking(e.target.value)
                        }
                        className="
                            h-12
                            px-4
                            rounded-2xl
                            bg-[#1b2229]
                            border border-white/5
                            text-gray-300
                            text-sm
                            outline-none
                            cursor-pointer
                        "
                    >
                        <option value="10">
                            Ranking: Top 10
                        </option>
                        <option value="5">
                            Top 5
                        </option>
                        <option value="20">
                            Top 20
                        </option>
                        <option value="All">
                            All Teams
                        </option>
                    </select>

                    <select
                        value={format}
                        onChange={(e) =>
                            setFormat(e.target.value)
                        }
                        className="
                            h-12
                            px-4
                            rounded-2xl
                            bg-[#1b2229]
                            border border-white/5
                            text-gray-300
                            text-sm
                            outline-none
                            cursor-pointer
                        "
                    >
                        <option value="All">
                            Format: All
                        </option>
                        <option value="Test">
                            Test
                        </option>
                        <option value="ODI">
                            ODI
                        </option>
                        <option value="T20I">
                            T20I
                        </option>
                        <option value="T20">
                            T20
                        </option>
                        <option value="First Class">
                            First Class
                        </option>
                        <option value="List A">
                            List A
                        </option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SearchFilter;