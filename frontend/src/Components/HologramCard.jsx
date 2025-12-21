import "./HologramCard.css";

export default function HologramCard({ game }) {
  return (
    <a href={game.link} target="_blank" rel="noopener noreferrer">
      <div className="game-card group">
        {/* Card Image (Top 70%) */}
        <div className="card-image">
          <img
            src={game.image}
            alt={game.title}
            className="card-img"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Card Details (Bottom 30%) */}
        <div className="card-details">
          <h3 className="card-title">{game.title}</h3>
          <p className="card-date">Completed: {game.completedDate}</p>
        </div>
      </div>
    </a>
  );
}
