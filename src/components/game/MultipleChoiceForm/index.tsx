import { useContext } from "react";

import { GameContext } from "../../../context/GameProvider";

import "./MultipleChoiceForm.css";

const MultipleChoiceForm = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error(
      "MultipleChoiceForm must be used inside GameProvider"
    );
  }

  const { options, submitAnswer, isAnswering } = context;

  return (
    <div className="multiple-choice-grid">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => submitAnswer(option)}
          disabled={isAnswering}
          className="choice-button"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default MultipleChoiceForm;