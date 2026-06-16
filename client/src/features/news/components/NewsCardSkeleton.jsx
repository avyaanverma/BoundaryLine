function NewsCardSkeleton() {
    return (
        <div
            className="
                relative
                overflow-hidden
                rounded-3xl
                border border-white/10
                bg-[#1b1f25]
                animate-pulse
            "
        >
            {/* Left Accent */}
            <div className="absolute left-0 top-0 h-full w-1 bg-blue-500" />

            <div className="flex flex-col md:flex-row gap-6 p-6">

                {/* Image Skeleton */}
                <div
                    className="
                        w-full
                        md:w-[320px]
                        h-[220px]
                        rounded-2xl
                        bg-white/5
                        shrink-0
                    "
                />

                {/* Content Skeleton */}
                <div className="flex-1">

                    {/* Category */}
                    <div className="h-5 w-32 rounded bg-white/5 mb-6" />

                    {/* Title Line 1 */}
                    <div className="h-10 w-[70%] rounded bg-white/5 mb-3" />

                    {/* Title Line 2 */}
                    <div className="h-10 w-[95%] rounded bg-white/5 mb-8" />

                    {/* Meta */}
                    <div className="h-6 w-40 rounded bg-white/5" />
                </div>
            </div>
        </div>
    );
}

export default NewsCardSkeleton;