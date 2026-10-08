import { useContext } from "react";

import { GameContext } from "../../../context/GameProvider";

import "./AnswerFeedback.css";

const AnswerFeedback = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error(
      "AnswerFeedback must be used inside GameProvider"
    );
  }

  const { feedback } = context;

  if (!feedback) {
    return null;
  }

  return (
    <div>
      {feedback === "correct" ? "Correct!" : "Incorrect!"}
    </div>
  );
};

export default AnswerFeedback;