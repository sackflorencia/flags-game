import { useContext, useState } from "react";

import { GameContext } from "../context/GameProvider";

import ResultScore from "../components/results/ResultScore";
import PlayerNameInput from "../components/results/PlayerNameInput";
import SaveScoreButton from "../components/results/SaveScoreButton";
import PlayAgainButton from "../components/results/PlayAgainButton";
import BackToMenuButton from "../components/results/BackToMenuButton";
import { saveLeaderboardEntry } from "../services/leaderboardStorage";


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

    if (!trimmedName) {
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
    <main>
      <h1>Game Over!</h1>

      <ResultScore score={score} />

      <PlayerNameInput
        name={name}
        onChange={setName}
      />

      <SaveScoreButton
        onSave={handleSaveScore}
        disabled={!name.trim() || saved}
      />

      {saved && <p>Score saved!</p>}

      <div>
        <PlayAgainButton />
        <BackToMenuButton />
      </div>
    </main>
  );
};

export default ResultsPage;