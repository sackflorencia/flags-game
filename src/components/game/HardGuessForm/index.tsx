import { useContext, useState } from "react";

import { GameContext } from "../../../context/GameProvider";

import "./HardGuessForm.css";

const HardGuessForm = () => {
  const context = useContext(GameContext);
  const [answer, setAnswer] = useState("");

  if (!context) {
    throw new Error("HardGuessForm must be used within GameProvider");
  }

  const { submitAnswer, skipQuestion, isAnswering } = context;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!answer.trim() || isAnswering) return;

    submitAnswer(answer);
    setAnswer("");
  };

  const handleSkip = () => {
    if (isAnswering) return;

    setAnswer("");
    skipQuestion();
  };

  return (
    <form className="hard-guess-form" onSubmit={handleSubmit}>
      <input
        className="hard-guess-input"
        type="text"
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        placeholder="Escribí el nombre del país"
        disabled={isAnswering}
        autoComplete="off"
      />

      <button
        type="submit"
        disabled={!answer.trim() || isAnswering}
      >
        Adivinar
      </button>

      <button
        type="button"
        onClick={handleSkip}
        disabled={isAnswering}
      >
        Skip (-1)
      </button>
    </form>
  );
};

export default HardGuessForm;