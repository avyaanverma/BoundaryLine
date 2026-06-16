import Navbar from "../../../shared/component/NavBar";
import PageFooter from "../../../shared/component/PagesFooter";
import FeaturedArticles from "../component/FeaturedArticles";
import NewsCards from "../component/NewsCards";
import NewsCardSkeleton from "../component/NewsCardSkeleton";
import NewsHero from "../component/NewsHero";
import NewsletterCard from "../component/NewsletterCard";
import NewsTabs from "../component/NewsTab";
import TrendingNow from "../component/TrendingNow";

function NewsPage() {
    return (
        <div className="min-h-screen bg-[#070b12]">
            {/* Fixed Navbar */}
            <Navbar />

            {/* Page Content */}
            <main className="pt-20">

                {/* Hero Section */}
                <NewsHero />

                {/* Main Container */}
                <div className="max-w-[1420px] mx-auto px-4 lg:px-6">

                    {/* Tabs */}
                    <div className="pt-2">
                        <NewsTabs />
                    </div>

                    {/* Main Layout */}
                    <div className="py-8">

                        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                            {/* Left Content */}
                            <div className="xl:col-span-8 space-y-6">

                                {/* News Cards */}
                                <NewsCards />

                                {/* Featured Articles */}
                                <FeaturedArticles />

                                {/* Loading Skeleton */}
                                <NewsCardSkeleton />

                            </div>

                            {/* Right Sidebar */}
                            <div className="xl:col-span-4">

                                <div className="sticky top-24 space-y-6">

                                    <TrendingNow />

                                    <NewsletterCard />

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

            {/* Footer */}
            <PageFooter />
        </div>
    );
}

export default NewsPage;