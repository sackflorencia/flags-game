import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GameContext } from "../../../context/GameProvider";

const PlayAgainButton = () => {
  const context = useContext(GameContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error(
      "PlayAgainButton must be used inside GameProvider"
    );
  }

  const { startGame } = context;

  const handlePlayAgain = () => {
    startGame();
    navigate("/game");
  };

  return (
    <button type="button" onClick={handlePlayAgain}>
      Play Again
    </button>
  );
};

export default PlayAgainButton;