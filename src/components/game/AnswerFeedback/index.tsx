import { useContext } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

import { GameContext } from "../../../context/GameProvider";
import "./AnswerFeedback.css";

const AnswerFeedback = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("AnswerFeedback must be used inside GameProvider");
  }

  const { feedback } = context;

  if (!feedback) {
    return <div className="answer-feedback-spacer" aria-hidden="true" />;
  }

  const isCorrect = feedback === "correct";

  return (
    <div
      className={`answer-feedback ${isCorrect ? "feedback-correct" : "feedback-incorrect"}`}
      role="status"
      aria-live="polite"
    >
      {isCorrect ? (
        <CheckCircle2 size={18} strokeWidth={2.5} className="feedback-icon" />
      ) : (
        <XCircle size={18} strokeWidth={2.5} className="feedback-icon" />
      )}
      <span className="feedback-text">
        {isCorrect ? "Respuesta correcta (+1 punto)" : "Respuesta incorrecta"}
      </span>
    </div>
  );
};

export default AnswerFeedback;
