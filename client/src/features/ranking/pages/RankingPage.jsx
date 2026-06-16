import { useState } from "react";

import RankingsHero from "../component/RankingsHero";
import RankingsStats from "../component/RankingStats";
import RankingTabs from "../component/RankingTabs";
import RankingsTable from "../component/RankingTable";
import CategoryLeaders from "../component/CategoryLeaders";

import Navbar from "../../../shared/component/NavBar";
import PageFooter from "../../../shared/component/PagesFooter";

function RankingPage() {
    const [activeTab, setActiveTab] =
        useState("Teams");

    return (
        <div className="min-h-screen bg-[#070b12]">
            <Navbar />

            <main className="pt-10">
                <div className="max-w-[1420px] mx-auto px-4 lg:px-6 mt-20">

                    <RankingsHero />

                    <div className="mt-8">
                        <RankingsStats />
                    </div>

                    <div className="mt-10">
                        <RankingTabs
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    </div>

                    <div className="mt-8">
                        <RankingsTable
                            activeTab={activeTab}
                        />
                    </div>

                    <div className="mt-10 pb-16">
                        <CategoryLeaders
                            activeTab={activeTab}
                        />
                    </div>

                </div>
            </main>

            <PageFooter />
        </div>
    );
}

export default RankingPage;