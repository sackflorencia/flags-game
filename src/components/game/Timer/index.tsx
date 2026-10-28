import { useContext } from "react";

import { GameContext } from "../../../context/GameProvider";

import "./Timer.css";

const Timer = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("Timer must be used inside GameProvider");
  }

  const { timeLeft } = context;

  return (
    <div className={`timer-container ${timeLeft <= 10 ? "warning" : ""}`}>
      <span>Time: </span>
      <strong>{timeLeft}</strong>
    </div>
  );
};

export default Timer;