import { useContext } from "react";

import { GameContext } from "../../../context/GameProvider";

const Timer = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("Timer must be used inside GameProvider");
  }

  const { timeLeft } = context;

  return (
    <div>
      <span>Time</span>
      <strong>{timeLeft}</strong>
    </div>
  );
};

export default Timer;