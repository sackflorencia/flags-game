import { useContext, useState, useRef, useEffect } from "react";
import { SkipForward } from "lucide-react";

import { GameContext } from "../../../context/GameProvider";
import "./HardGuessForm.css";

const HardGuessForm = () => {
  const context = useContext(GameContext);
  const [answer, setAnswer] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  if (!context) {
    throw new Error("HardGuessForm must be used within GameProvider");
  }

  const { submitAnswer, skipQuestion, isAnswering, currentCountry } = context;

  // Auto-focus input when a new country appears
  useEffect(() => {
    if (!isAnswering && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentCountry, isAnswering]);

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
        ref={inputRef}
        className="hard-guess-input"
        type="text"
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        placeholder="Escribí el nombre del país..."
        disabled={isAnswering}
        autoComplete="off"
        aria-label="Nombre del país"
      />

      <div className="hard-buttons-row">
        <button
          type="submit"
          className="hard-btn-submit"
          disabled={!answer.trim() || isAnswering}
        >
          <span>Adivinar</span>
        </button>

        <button
          type="button"
          onClick={handleSkip}
          className="hard-btn-skip"
          disabled={isAnswering}
          title="Saltar a la siguiente bandera restando 1 punto"
        >
          <SkipForward size={15} strokeWidth={2} />
          <span>Saltar</span>
          <span className="skip-penalty">(-1 pto)</span>
        </button>
      </div>

      <span className="hard-helper-text">
        Presioná <strong>Enter</strong> para enviar la respuesta.
      </span>
    </form>
  );
};

export default HardGuessForm;
