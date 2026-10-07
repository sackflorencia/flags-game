import { useContext } from "react";

import { GameContext } from "../../../context/GameProvider";

const MultipleChoiceForm = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error(
      "MultipleChoiceForm must be used inside GameProvider"
    );
  }

  const { options, checkAnswer, nextQuestion } = context;

  const handleAnswer = (answer: string) => {
    const isCorrect = checkAnswer(answer);

    if (isCorrect) {
      nextQuestion();
    }
  };

  return (
    <div>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => handleAnswer(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default MultipleChoiceForm;