import { useContext, useState } from "react";
import { Trophy, Check } from "lucide-react";

import { GameContext } from "../context/GameProvider";
import type { GameMode } from "../types/game";
import ResultScore from "../components/results/ResultScore";
import PlayerNameInput from "../components/results/PlayerNameInput";
import SaveScoreButton from "../components/results/SaveScoreButton";
import PlayAgainButton from "../components/results/PlayAgainButton";
import BackToMenuButton from "../components/results/BackToMenuButton";
import { saveLeaderboardEntry } from "../services/leaderboardStorage";
import "./ResultsPage.css";

const modeNames: Record<GameMode, string> = {
  "multiple-choice": "Multiple Choice",
  hard: "Modo Experto",
  capitals: "Capitales",
};

const ResultsPage = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("ResultsPage must be used inside GameProvider");
  }

  const { score, gameMode } = context;

  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSaveScore = () => {
    const trimmedName = name.trim();

    if (!trimmedName || saved) {
      return;
    }

    saveLeaderboardEntry({
      name: trimmedName,
      score,
      mode: gameMode,
    });

    setSaved(true);
  };

  return (
    <main className="results-layout fade-in">
      <div className="results-card">
        <div className="results-icon-box">
          <Trophy size={32} strokeWidth={1.75} />
        </div>

        <div className="results-heading">
          <h1 className="results-title">Fin de la Partida</h1>
          <span className="results-mode-tag">
            Modalidad: <strong>{modeNames[gameMode]}</strong>
          </span>
        </div>

        <ResultScore score={score} />

        <div className="results-save-section">
          {!saved ? (
            <>
              <PlayerNameInput name={name} onChange={setName} />
              <SaveScoreButton
                onSave={handleSaveScore}
                disabled={!name.trim()}
              />
            </>
          ) : (
            <div className="results-saved-alert" role="status">
              <Check size={18} strokeWidth={2.5} />
              <span>Puntuación guardada correctamente en la tabla.</span>
            </div>
          )}
        </div>

        <div className="results-actions-row">
          <PlayAgainButton />
          <BackToMenuButton />
        </div>
      </div>
    </main>
  );
};

export default ResultsPage;
