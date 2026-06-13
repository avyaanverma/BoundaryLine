import Navbar from "../shared/components/navbar/Navbar";
import Hero from "../shared/components/hero/Hero";
import Footer from "../shared/components/footer/Footer";

import LiveMatches from "../features/matches/components/LiveMatches";
import MatchOverview from "../features/matches/components/MatchOverview";

import AdvancedFeatures from "../features/feature_section/component/AdvancedFeatures";

import NewsPlayers from "../features/news/components/NewsSection";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <LiveMatches />
      <MatchOverview />
      <AdvancedFeatures />
      <NewsPlayers />
      <Footer />
    </>
  );
}

export default Home;