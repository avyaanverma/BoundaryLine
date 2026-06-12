
import StatCard from './StatCard'

function StatsCards() {
    return (
        <div className="flex justify-between gap-2.5">
            <StatCard
                title="Total Users"
                value="1.2M"
                change="+12%"
                borderColor="border-l-green-300"
                valueColor="text-green-300"
                changeColor="text-green-300"
            />

            <StatCard
                title="Active Matches"
                value="42"
                change="Stable"
                borderColor="border-l-green-500"
                valueColor="text-green-500"
                changeColor="text-green-500"
            />

            <StatCard
                title="API Requests/min"
                value="8.4K"
                change="+18%"
                borderColor="border-l-red-300"
                valueColor="text-red-300"
                changeColor="text-red-300"
            />

            <StatCard
                title="System Uptime"
                value="99.9%"
                change="24h"
                borderColor="border-l-gray-300"
                valueColor="text-gray-100"
                changeColor="text-gray-300"
            />
        </div>
    )
}

export default StatsCards
