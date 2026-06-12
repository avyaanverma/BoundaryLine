import StatCards from "../component/StatsCards";
import ApiUsagesCard from '../component/ApiUsageCard'
import GrowthChart from '../component/GrowthChart'
import AdminManagement from "../component/AdminManagement";
import AnalyticsHearder from "../component/AnalyticsHearder";


function AnalyticsPage() {
    return (
        <div className="grid gap-6 w-[100%] bg-[#111316] p-5">
            <AnalyticsHearder />
            <StatCards />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <GrowthChart />
                </div>

                <div>
                    <ApiUsagesCard />
                </div>
            </div>
            <AdminManagement />

        </div>
    )
}

export default AnalyticsPage
