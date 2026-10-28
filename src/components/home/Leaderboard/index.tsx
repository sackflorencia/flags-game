import { useContext } from "react";

import { GameContext } from "../../../context/GameProvider";
import { getLeaderboardByMode } from "../../../services/leaderboardStorage";

import "./Leaderboard.css";

const Leaderboard = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("Leaderboard must be used inside GameProvider");
  }
  const { gameMode } = context;

  const leaderboard = getLeaderboardByMode(gameMode);

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Leaderboard</h2>

      {leaderboard.length === 0 ? (
        <p>No hay puntajes todavía.</p>
      ) : (
        <ul className="leaderboard-list">
          {leaderboard.map((entry, index) => (
            <li key={`${entry.name}-${index}`} className="leaderboard-item">
              <span>
                #{index + 1} {entry.name}
              </span>
              <strong>{entry.score}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;