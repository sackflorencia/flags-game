import { useContext, useState } from "react";
import { GameContext } from "../../../context/GameProvider";
import "./MultipleChoiceForm.css";

const letters = ["A", "B", "C", "D"];

const MultipleChoiceForm = () => {
  const context = useContext(GameContext);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  if (!context) {
    throw new Error("MultipleChoiceForm must be used inside GameProvider");
  }

  const { options, submitAnswer, isAnswering, feedback } = context;

  const handleClick = (option: string) => {
    setSelectedOption(option);
    submitAnswer(option);
  };

  return (
    <div className="multiple-choice-grid" role="group" aria-label="Opciones de respuesta">
      {options.map((option, index) => {
        const isSelected = selectedOption === option;
        const letter = letters[index] || String(index + 1);

        let statusClass = "";
        if (isSelected && isAnswering) {
          if (feedback === "correct") statusClass = "choice-correct";
          else if (feedback === "incorrect") statusClass = "choice-incorrect";
          else statusClass = "choice-selected";
        }

        return (
          <button
            key={option}
            type="button"
            onClick={() => handleClick(option)}
            disabled={isAnswering}
            className={`choice-button ${statusClass}`}
          >
            <span className="choice-badge" aria-hidden="true">
              {letter}
            </span>
            <span className="choice-label">{option}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MultipleChoiceForm;
