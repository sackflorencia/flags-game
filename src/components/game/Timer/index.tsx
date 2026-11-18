import { useContext } from "react";
import { Timer as TimerIcon } from "lucide-react";

import { GameContext } from "../../../context/GameProvider";
import "./Timer.css";

const Timer = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("Timer must be used inside GameProvider");
  }

  const { timeLeft } = context;
  const isWarning = timeLeft <= 10;

  return (
    <div
      className={`game-stat timer-stat ${isWarning ? "is-warning" : ""}`}
      aria-label={`Tiempo restante: ${timeLeft} segundos`}
    >
      <TimerIcon size={16} strokeWidth={2} className="game-stat__icon" />
      <div className="game-stat__details">
        <span className="game-stat__label">Tiempo</span>
        <strong className="game-stat__value">{timeLeft}s</strong>
      </div>
    </div>
  );
};

export default Timer;
