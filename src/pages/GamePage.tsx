import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { GameContext } from "../context/GameProvider";

import Flag from "../components/game/Flag";
import Scoreboard from "../components/game/ScoreBoard";
import Timer from "../components/game/Timer";
import MultipleChoiceForm from "../components/game/MultipleChoiceForm";
import AnswerFeedback from "../components/game/AnswerFeedback";

const GamePage = () => {
  const context = useContext(GameContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("GamePage must be used inside GameProvider");
  }

  const { gameStatus } = context;

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
      <MultipleChoiceForm />
      <AnswerFeedback />
    </main>
  );
};

export default GamePage;