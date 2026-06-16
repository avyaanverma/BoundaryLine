import StandingsTable from "../component/StandingsTable";

function PointsTable() {
    return (
        <div className="min-h-screen bg-[#1a1c1c] text-white px-8 py-10">

            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-5xl font-bold text-lime-400">
                    Points Table
                </h1>

                <p className="text-gray-400 mt-2">
                    Track team standings, points, net run rate, and tournament rankings.
                </p>
            </div>

            {/* Main Table */}
            <div className="grid grid-cols-1">
                <StandingsTable />
            </div>

        </div>
    );
}

export default PointsTable;