import { Share2, Bookmark } from "lucide-react";

const articles = [
    {
        id: 1,
        category: "ANALYSIS",
        title:
            "Data Science in Cricket: How AI is Predicting Match Outcomes",
        description:
            "The role of advanced analytics and machine learning in transforming the strategy behind every delivery in professional cricket.",
        author: "Admin",
        time: "4h ago",
        image:
            "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200",
        accent: "bg-red-500",
        initials: "CP",
        titleColor: "text-white",
    },
    {
        id: 2,
        category: "SERIES UPDATE",
        title:
            "The Road to the Finals: Who's Leading the T20 World Standings",
        description:
            "A comprehensive breakdown of the current points table and what each team needs to qualify for the upcoming knockouts.",
        author: "John Doe",
        time: "6h ago",
        image:
            "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200",
        accent: "bg-blue-500",
        initials: "JD",
        titleColor: "text-[#94d5a5]",
    },
];

export default function NewsCards() {
    return (
        <div className="space-y-6">
            {articles.map((article) => (
                <article
                    key={article.id}
                    className="
                        relative
                        overflow-hidden
                        rounded-3xl
                        border border-white/10
                        bg-[#171b22]
                    "
                >
                    {/* Accent Line */}
                    <div
                        className={`absolute left-0 top-0 h-full w-1 ${article.accent}`}
                    />

                    <div className="flex flex-col lg:flex-row gap-5 p-5 lg:p-6">

                        {/* Image */}
                        <div className="w-full lg:w-[300px] shrink-0">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="
                                    w-full
                                    h-[180px]
                                    md:h-[220px]
                                    object-cover
                                    rounded-2xl
                                "
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col">

                            {/* Category */}
                            <span
                                className="
                                    text-xs
                                    md:text-sm
                                    font-bold
                                    tracking-[0.15em]
                                    uppercase
                                    text-[#94d5a5]
                                "
                            >
                                {article.category}
                            </span>

                            {/* Title */}
                            <h2
                                className={`
                                    mt-2
                                    text-xl
                                    md:text-2xl
                                    lg:text-3xl
                                    font-bold
                                    leading-snug
                                    ${article.titleColor}
                                `}
                            >
                                {article.title}
                            </h2>

                            {/* Description */}
                            <p
                                className="
                                    mt-3
                                    text-sm
                                    md:text-base
                                    text-gray-400
                                    leading-relaxed
                                "
                            >
                                {article.description}
                            </p>

                            {/* Footer */}
                            <div
                                className="
                                    mt-auto
                                    pt-5
                                    border-t
                                    border-white/10
                                    flex
                                    items-center
                                    justify-between
                                "
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="
                                            h-10 w-10
                                            rounded-full
                                            border border-white/10
                                            bg-white/5
                                            flex items-center justify-center
                                            text-[#94d5a5]
                                            text-sm
                                            font-bold
                                        "
                                    >
                                        {article.initials}
                                    </div>

                                    <div className="text-sm text-gray-400">
                                        <span>{article.author}</span>
                                        <span className="mx-2 text-gray-500">•</span>
                                        <span>{article.time}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button className="text-gray-400 hover:text-white transition">
                                        <Share2 size={18} />
                                    </button>

                                    <button className="text-gray-400 hover:text-white transition">
                                        <Bookmark size={18} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}