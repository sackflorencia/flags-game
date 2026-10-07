import { useContext } from "react";

import { GameContext } from "../../../context/GameProvider";

const MultipleChoiceForm = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error(
      "MultipleChoiceForm must be used inside GameProvider"
    );
  }

  const { options, submitAnswer, isAnswering } = context;

  return (
    <div>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => submitAnswer(option)}
          disabled={isAnswering}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default MultipleChoiceForm;