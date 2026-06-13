import { ArrowRight } from "lucide-react";

import newsData from "../data/newsData";
import playersData from "../data/playersData";

import NewsCard from "./NewsCard";
import PlayerCard from "./PlayerCard";

import "../styles/News.css";

function NewsSection() {
  const sortedPlayers = [...playersData].sort(
    (a, b) => a.rank - b.rank
  );

  return (
    <section className="news-section">
      <div className="news-layout">

        {/* Latest News */}

        <div className="latest-news">
          <div className="section-header">
            <h2>Latest News</h2>

            <button className="browse-btn">
              Browse News
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="news-grid">
            {newsData.map((news) => (
              <NewsCard
                key={news.id}
                news={news}
              />
            ))}
          </div>
        </div>

        {/* Top Players */}

        <div className="top-players">
          <h2>Top Players</h2>

          <div className="players-list">
            {sortedPlayers.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsSection;