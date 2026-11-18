import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ListChecks, Keyboard, Landmark } from "lucide-react";

import { GameContext } from "../context/GameProvider";
import type { GameMode } from "../types/game";

import Flag from "../components/game/Flag";
import Scoreboard from "../components/game/ScoreBoard";
import Timer from "../components/game/Timer";
import MultipleChoiceForm from "../components/game/MultipleChoiceForm";
import HardGuessForm from "../components/game/HardGuessForm";
import AnswerFeedback from "../components/game/AnswerFeedback";
import "./GamePage.css";

const modeConfig: Record<
  GameMode,
  {
    name: string;
    icon: typeof ListChecks;
    className: string;
  }
> = {
  "multiple-choice": {
    name: "Multiple Choice",
    icon: ListChecks,
    className: "mode-theme--multiple-choice",
  },
  hard: {
    name: "Modo Experto",
    icon: Keyboard,
    className: "mode-theme--hard",
  },
  capitals: {
    name: "Capitales",
    icon: Landmark,
    className: "mode-theme--capitals",
  },
};

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

  const handleExitGame = () => {
    navigate("/");
  };

  const currentMode = modeConfig[gameMode];
  const ModeIcon = currentMode.icon;

  return (
    <main className="game-layout fade-in">
      {/* Top HUD with clean navigation and stats */}
      <header className="game-top-bar">
        <button
          type="button"
          onClick={handleExitGame}
          className="game-exit-btn"
          aria-label="Volver al menú principal"
        >
          <ChevronLeft size={16} strokeWidth={2} />
          <span>Menú</span>
        </button>

        <div className={`game-mode-indicator ${currentMode.className}`}>
          <ModeIcon size={15} strokeWidth={2} />
          <span>{currentMode.name}</span>
        </div>

        <div className="game-hud-group">
          <Scoreboard />
          <Timer />
        </div>
      </header>

      {/* Mode-specific challenge presentation */}
      {gameMode === "capitals" ? (
        <section className="capital-challenge-card" aria-label="Pregunta sobre capitales">
          <span className="capital-challenge-kicker">Geografía & Capitales</span>
          <h2 className="capital-question">
            ¿Cuál es la capital de
            <span className="capital-country-name">
              {currentCapitalCountry?.name || "Cargando..."}?
            </span>
          </h2>
        </section>
      ) : (
        <div className="game-question-header">
          <h2 className="game-question-title">¿A qué país pertenece esta bandera?</h2>
          {gameMode === "hard" && (
            <p className="game-question-sub">
              Escribí el nombre exacto y confirmá con Enter
            </p>
          )}
          <Flag />
        </div>
      )}

      {/* Game forms */}
      {gameMode === "multiple-choice" && <MultipleChoiceForm />}
      {gameMode === "hard" && <HardGuessForm />}
      {gameMode === "capitals" && <MultipleChoiceForm />}

      {/* Feedback banner */}
      <AnswerFeedback />
    </main>
  );
};

export default GamePage;
