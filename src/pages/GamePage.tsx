import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { GameContext } from "../context/GameProvider";

import Flag from "../components/game/Flag";
import Scoreboard from "../components/game/ScoreBoard";
import Timer from "../components/game/Timer";
import MultipleChoiceForm from "../components/game/MultipleChoiceForm";
import HardGuessForm from "../components/game/HardGuessForm";
import AnswerFeedback from "../components/game/AnswerFeedback";

const GamePage = () => {
  const context = useContext(GameContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("GamePage must be used inside GameProvider");
  }

  const { gameStatus, gameMode } = context;

  useEffect(() => {
    if (gameStatus === "finished") {
      navigate("/results");
    }
  }, [gameStatus, navigate]);

  return (
    <main>
      <Scoreboard />
      <Timer />
      <Flag />

      {gameMode === "multiple-choice" && <MultipleChoiceForm />}
      {gameMode === "hard" && <HardGuessForm />}

      <AnswerFeedback />
    </main>
  );
};

export default GamePage;