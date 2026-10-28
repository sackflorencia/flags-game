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

  const { gameStatus, gameMode, currentCapitalCountry } = context;


  useEffect(() => {
    if (gameStatus === "finished") {
      navigate("/results");
    }
  }, [gameStatus, navigate]);

  return (
    <main>
      <Scoreboard />
      <Timer />
      {gameMode === "capitals" ? (
        <h2>
          ¿Cuál es la capital de {currentCapitalCountry?.name}?
        </h2>
      ) : (
        <Flag />
      )}

      {gameMode === "multiple-choice" && <MultipleChoiceForm />}
      {gameMode === "hard" && <HardGuessForm />}
      {gameMode === "capitals" && <MultipleChoiceForm />}

      <AnswerFeedback />
    </main>
  );
};

export default GamePage;