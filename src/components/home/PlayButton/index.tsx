import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GameContext } from "../../../context/GameProvider";

import "./PlayButton.css";

const PlayButton = () => {
  const navigate = useNavigate();
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("PlayButton must be used inside GameProvider");
  }

  const { startGame } = context;

  const handlePlay = () => {
    startGame();
    navigate("/game");
  };

  return (
    <button type="button" onClick={handlePlay} className="play-button">
      Play
    </button>
  );
};

export default PlayButton;