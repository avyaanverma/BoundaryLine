function NewsletterCard() {
    return (
        <div
            className="
                rounded-3xl
                bg-[#005f26]
                border border-[#94d5a5]/10
                p-6 md:p-8
            "
        >
            {/* Heading */}
            <h2 className="text-2xl md:text-2xl font-bold text-[#94d5a5]">
                Pulse Newsletter
            </h2>

            {/* Description */}
            <p className="mt-2 text-lg md:text-xl text-[#94d5a5]/70 max-w-3xl leading-relaxed">
                Get the daily cricket briefings and exclusive
                analysis directly in your inbox.
            </p>

            {/* Form */}
            <div className="mt-5 flex flex-col sm:flex-row gap-4">
                <input
                    type="email"
                    placeholder="Your email"
                    className="
                        flex-1
                        h-14 md:h-12
                        rounded-2xl
                        px-5
                        bg-[#00441b]
                        text-[#94d5a5]
                        placeholder:text-[#94d5a5]/40
                        outline-none
                        border border-transparent
                        focus:border-[#94d5a5]/30
                    "
                />

                <button
                    className="
                        h-14 md:h-12
                        px-8 md:px-10
                        rounded-2xl
                        bg-[#94d5a5]
                        text-[#003d18]
                        font-bold
                        text-lg
                        hover:scale-105
                        transition-all
                    "
                >
                    Join
                </button>
            </div>
        </div>
    );
}

export default NewsletterCard;