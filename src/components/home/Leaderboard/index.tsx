import { useContext } from "react";
import { Trophy } from "lucide-react";

import { GameContext } from "../../../context/GameProvider";
import { getLeaderboardByMode } from "../../../services/leaderboardStorage";
import type { GameMode } from "../../../types/game";
import "./Leaderboard.css";

const modeLabels: Record<GameMode, string> = {
  "multiple-choice": "Multiple Choice",
  hard: "Modo Experto",
  capitals: "Capitales",
};

const Leaderboard = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("Leaderboard must be used inside GameProvider");
  }
  const { gameMode } = context;

  const leaderboard = getLeaderboardByMode(gameMode);

  return (
    <div className="leaderboard-card">
      <div className="leaderboard-header">
        <div className="leaderboard-header__titles">
          <h2 className="leaderboard-title">Tabla de Posiciones</h2>
          <span className="leaderboard-subtitle">
            Modalidad actual: <strong>{modeLabels[gameMode]}</strong>
          </span>
        </div>
      </div>

      {leaderboard.length === 0 ? (
        <div className="leaderboard-empty">
          <Trophy size={32} strokeWidth={1.5} className="leaderboard-empty__icon" />
          <p className="leaderboard-empty__text">
            No hay puntuaciones registradas en {modeLabels[gameMode]}.
          </p>
          <span className="leaderboard-empty__hint">
            Completá una partida para inaugurar la tabla.
          </span>
        </div>
      ) : (
        <ul className="leaderboard-list">
          {leaderboard.slice(0, 10).map((entry, index) => (
            <li
              key={`${entry.name}-${index}`}
              className={`leaderboard-item ${index < 3 ? "is-top-tier" : ""}`}
            >
              <div className="leaderboard-item__player">
                <span className={`rank-indicator rank-${index + 1}`}>
                  {index + 1}
                </span>
                <span className="player-name">{entry.name}</span>
              </div>
              <div className="leaderboard-item__score">
                <strong>{entry.score}</strong>
                <span className="score-label">pts</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
