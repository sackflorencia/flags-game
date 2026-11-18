import { useContext } from "react";
import { Award } from "lucide-react";

import { GameContext } from "../../../context/GameProvider";
import "./ScoreBoard.css";

const Scoreboard = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("Scoreboard must be used inside GameProvider");
  }

  const { score } = context;

  return (
    <div className="game-stat" aria-label={`Puntaje: ${score}`}>
      <Award size={16} strokeWidth={2} className="game-stat__icon" />
      <div className="game-stat__details">
        <span className="game-stat__label">Puntos</span>
        <strong className="game-stat__value">{score}</strong>
      </div>
    </div>
  );
};

export default Scoreboard;
