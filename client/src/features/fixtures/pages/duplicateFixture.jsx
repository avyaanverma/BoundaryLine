import React, { useState } from "react";

import MatchCardCountdown from "../component/MatchCardCountdown";
import MatchCardFull from "../component/MatchCardFull";
import MatchCardResult from "../component/MatchCardResult";
import MiniMatchCard from "../component/MiniMatchCard";
import SectionDivider from "../component/SectionDivider";
import GlassPanel from "../component/GlassPanel";


function DuplicateFixture() {
    const [view, setView] = useState("list");



    return (
        <>
            <div className="w-full pt-20 px-4 md:px-6 min-h-screen pb-10">
                <header className="py-10">
                    <h1 className="text-[32px] font-bold text-[#e2e2e6]">
                        Match Schedule
                    </h1>
                    <p className="text-[#c0c9bf]">
                        Track upcoming internationals, domestic leagues, and world championships.
                    </p>
                </header>

                {/* Today */}
                <section className="mb-10">
                    <SectionDivider label="Today" date="OCT 24" />

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        <MatchCardFull
                            format="t20"
                            seriesName="ICC Men's T20 World Cup"
                            subtitle="Final • Barbados"
                            status="LIVE"
                            team1={{
                                code: "IND",
                                name: "India",
                                score: "176/7",
                                scoreStyle: "primary",
                            }}
                            team2={{
                                code: "SA",
                                name: "South Africa",
                                score: "Yet to bat",
                                scoreStyle: "muted",
                            }}
                        />

                        <MatchCardCountdown
                            seriesName="Bilateral Series"
                            subtitle="1st ODI • London"
                            team1={{ code: "ENG", name: "England" }}
                            team2={{ code: "AUS", name: "Australia" }}
                            countdown="04:32:15"
                        />

                        <MatchCardResult
                            seriesName="ICC WTC Final"
                            subtitle="Day 5 • The Oval"
                            team1={{
                                name: "New Zealand",
                                score: "245 & 140/2",
                            }}
                            team2={{
                                name: "Pakistan",
                                score: "217 & 167",
                            }}
                            resultText="Pakistan won by 8 wickets"
                        />
                    </div>
                </section>

                {/* Later this month */}
                <section className="mb-10">
                    <SectionDivider label="Later This Month" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <MiniMatchCard
                            date="OCT 28"
                            format="T20I"
                            team1="AUS"
                            team2="SA"
                        />

                        <MiniMatchCard
                            date="OCT 30"
                            format="TEST"
                            team1="PAK"
                            team2="NZ"
                        />
                    </div>
                </section>
            </div>


        </>
    );
}

export default DuplicateFixture;