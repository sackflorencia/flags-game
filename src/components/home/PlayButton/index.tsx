import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";

import { GameContext } from "../../../context/GameProvider";
import "./PlayButton.css";

const PlayButton = () => {
  const navigate = useNavigate();
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("PlayButton must be used inside GameProvider");
  }

  const { startGame, gameMode } = context;

  const handlePlay = () => {
    startGame();
    navigate("/game");
  };

  return (
    <button
      type="button"
      onClick={handlePlay}
      className={`play-button play-button--${gameMode}`}
      aria-label="Comenzar partida"
    >
      <Play size={18} fill="currentColor" strokeWidth={1} />
      <span>Comenzar Partida</span>
    </button>
  );
};

export default PlayButton;
