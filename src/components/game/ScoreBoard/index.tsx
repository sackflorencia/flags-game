import { useContext } from "react";
import { GameContext } from "../../../context/GameProvider";

import "./ScoreBoard.css";

const Scoreboard = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("Scoreboard must be used inside GameProvider");
  }

  const { score } = context;

  return (
    <div className="score-board">
      <div className="score-item">
        <span>Score</span>
        <strong>{score}</strong>
      </div>
    </div>
  );
};

export default Scoreboard;