import { useContext } from "react";
import { GameContext } from "../../../context/GameProvider";


const Scoreboard = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("Scoreboard must be used inside GameProvider");
  }

  const { score } = context;

  return (
    <div>
      <span>Score</span>
      <strong>{score}</strong>
    </div>
  );
};

export default Scoreboard;