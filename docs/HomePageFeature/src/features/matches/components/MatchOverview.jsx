import "../styles/MatchOverview.css";

import upcomingMatches from "../data/upcomingMatches";
import recentResults from "../data/recentResults";

import { FaRegBell } from "react-icons/fa";

function MatchOverview() {
  return (
    <section className="overview-section">
      {/* Upcoming Matches */}

      <div className="overview-column">
        <div className="section-header">
          <h2>Upcoming Matches</h2>

          <button>View All</button>
        </div>

        {upcomingMatches.map((match) => (
          <div className="upcoming-card" key={match.id}>
            <div className="date-box">
              <h3>{match.date}</h3>

              <span>{match.month}</span>
            </div>

            <div className="match-info">
              <h4>{match.match}</h4>

              <p>{match.venue}</p>
            </div>

            <div className="bell-icon">
              <FaRegBell />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Results */}

      <div className="overview-column">
        <div className="section-header">
          <h2>Recent Results</h2>

          <button>View All</button>
        </div>

        {recentResults.map((match) => (
          <div className="result-card" key={match.id}>
            <div className="result-left">
              <p className="tournament">
                {match.tournament}
              </p>

              <h4>{match.result}</h4>
            </div>

            <div className="result-right">
              <p className="winner-score">
                {match.score1}
              </p>

              <p>{match.score2}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MatchOverview;