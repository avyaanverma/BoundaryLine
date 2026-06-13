function PlayerCard({ player }) {
  return (
    <div className="player-card">
      <div className="player-left">
        <img
          src={player.image}
          alt={player.name}
          className="player-img"
        />

        <div>
          <h4>{player.name}</h4>

          <p>
            {player.country} • {player.role}
          </p>
        </div>
      </div>

      <div className="player-rank">
        <span>{player.rank}</span>

        <small>{player.format}</small>
      </div>
    </div>
  );
}

export default PlayerCard;