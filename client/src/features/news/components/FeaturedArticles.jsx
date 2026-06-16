import { ChevronRight } from "lucide-react";

const articles = [
    {
        id: 1,
        category: "OPINION",
        title: "Why the Yorker is becoming a Lost Art in ODI",
        readTime: "8 mins read",
        image:
            "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200",
        categoryColor: "text-red-300",
        titleColor: "text-white",
    },
    {
        id: 2,
        category: "INTERVIEWS",
        title: "Captain's Corner: In Conversation with the Skipper",
        readTime: "15 mins read",
        image:
            "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=1200",
        categoryColor: "text-[#94d5a5]",
        titleColor: "text-[#94d5a5]",
    },
];

export default function FeaturedArticles() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {articles.map((article) => (
                <article
                    key={article.id}
                    className="
                        group
                        overflow-hidden
                        rounded-3xl
                        border border-white/10
                        bg-[#1b1f25]
                        hover:border-white/20
                        transition-all duration-300
                    "
                >
                    {/* Image */}
                    <div className="p-4 pb-0">
                        <div className="overflow-hidden rounded-2xl">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="
                                    w-full
                                    h-[180px]
                                    md:h-[220px]
                                    object-cover
                                    transition-transform duration-500
                                    group-hover:scale-105
                                "
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-5">

                        {/* Category */}
                        <span
                            className={`
                                text-[11px]
                                md:text-xs
                                font-semibold
                                tracking-[0.15em]
                                uppercase
                                ${article.categoryColor}
                            `}
                        >
                            {article.category}
                        </span>

                        {/* Title */}
                        <h3
                            className={`
                                mt-2
                                text-lg
                                md:text-xl
                                lg:text-2xl
                                font-bold
                                leading-snug
                                ${article.titleColor}
                            `}
                        >
                            {article.title}
                        </h3>

                        {/* Footer */}
                        <div className="mt-6 flex items-center justify-between">
                            <span className="text-gray-400 text-xs md:text-sm">
                                {article.readTime}
                            </span>

                            <button
                                className="
                                    text-gray-400
                                    hover:text-white
                                    transition-colors
                                "
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                    </div>
                </article>
            ))}
        </div>
    );
}