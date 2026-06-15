import { CalendarDays } from "lucide-react";

function AnalyticsHeader() {
    return (
        <section
            className="
                relative
                overflow-hidden
                rounded-3xl
                border border-[#94d5a5]/10
                bg-gradient-to-br
                from-[#11161c]
                via-[#151b20]
                to-[#11161c]
                px-6
                py-8
                md:px-10
                md:py-10
                mb-8
            "
        >
            {/* Green Glow */}
            <div
                className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_top_right,rgba(148,213,165,0.15),transparent_40%)]
                "
            />

            <div className="relative z-10">

                {/* Badge */}
                <span
                    className="
                        inline-flex
                        items-center
                        rounded-full
                        border border-[#94d5a5]/20
                        bg-[#94d5a5]/10
                        px-4
                        py-1.5
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wider
                        text-[#94d5a5]
                    "
                >
                    Tournament Analytics
                </span>

                {/* Heading */}
                <h1
                    className="
                        mt-4
                        text-4xl
                        md:text-5xl
                        lg:text-6xl
                        font-bold
                        tracking-tight
                        text-white
                    "
                >
                    Apex Premier League
                </h1>

                {/* Meta */}
                <div
                    className="
                        flex
                        flex-wrap
                        items-center
                        gap-3
                        mt-5
                        text-gray-400
                        text-sm
                        md:text-base
                    "
                >
                    <CalendarDays
                        size={18}
                        className="text-[#94d5a5]"
                    />

                    <span className="text-[#94d5a5] font-medium">
                        Season 2024
                    </span>

                    <span className="text-gray-600">•</span>

                    <span>
                        Jan 01 - Dec 31
                    </span>
                </div>

            </div>
        </section>
    );
}

export default AnalyticsHeader;