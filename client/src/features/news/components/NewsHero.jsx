import { ArrowRight, Share2 } from "lucide-react";

function NewsHero() {
    return (
        <section className="relative overflow-hidden  min-h-[500px] md:min-h-[650px]">
            {/* Background Image */}
            <img
                src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e"
                alt="Cricket Stadium"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#05080d]/95 via-[#05080d]/75 to-transparent" />

            {/* Bottom Glow */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#05080d] to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex items-center h-full px-6 md:px-10 lg:px-14 py-12">
                <div className="max-w-4xl">

                    {/* Badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#94d5a5] text-black text-xs font-bold uppercase tracking-wider mb-6">
                        Breaking News
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05]">
                        The Revival of Spin:
                        <br />
                        How Modern Turners
                        <br />
                        are Dominating the
                        <br />
                        Test Arena
                    </h1>

                    {/* Description */}
                    <p className="mt-6 text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed">
                        A deep dive into the evolving mechanics of world-class
                        spin bowling and why traditional techniques are making
                        a massive comeback in the modern game.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 mt-8">
                        <button
                            className="
                                flex items-center gap-2
                                px-6 py-3
                                rounded-xl
                                bg-[#94d5a5]
                                text-black
                                font-semibold
                                hover:scale-105
                                transition-all
                            "
                        >
                            Read Article
                            <ArrowRight size={18} />
                        </button>

                        <button
                            className="
                                h-12 w-12
                                rounded-xl
                                bg-white/10
                                backdrop-blur-md
                                border border-white/10
                                text-white
                                flex items-center justify-center
                                hover:bg-white/20
                                transition-all
                            "
                        >
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NewsHero;