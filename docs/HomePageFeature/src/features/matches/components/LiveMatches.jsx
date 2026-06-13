import { useRef } from "react";
import "../styles/LiveMatches.css";
import matches from "../data/matches";

export default function LiveMatches() {
  const sliderRef = useRef(null);

  const nextSlide = () => {
    sliderRef.current?.scrollBy({
      left: 420,
      behavior: "smooth",
    });
  };

  const prevSlide = () => {
    sliderRef.current?.scrollBy({
      left: -420,
      behavior: "smooth",
    });
  };

  return (
    <section className="liveMatchesContainer">
      <div className="liveHeader">
        <div>
          <h1>Live Matches</h1>
          <p>Matches currently in progress worldwide</p>
        </div>

        <div className="navBtns">
          <button onClick={prevSlide}>❮</button>
          <button onClick={nextSlide}>❯</button>
        </div>
      </div>

      <div className="slider" ref={sliderRef}>
        {matches.map((match) => (
          <div
            key={match.id}
            className="matchCard"
            style={{
              borderLeft: `4px solid ${match.color}`,
            }}
          >
            <div className="topRow">
              <span className="badge">{match.format}</span>
              <span className="live">● LIVE</span>
            </div>

            <div className="teams">
              {[match.team1, match.team2].map((team) => (
                <div className="teamRow" key={team.short}>
                  <div className="teamInfo">
                    <div className="logo">
                      <img src={team.logo} alt={team.name} />
                    </div>

                    <span>{team.name}</span>
                  </div>

                  <div className="score">
                    {team.score}
                    <small>{team.overs}</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="divider"></div>

            <div className="status">{match.status}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
