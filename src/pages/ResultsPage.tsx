import { useContext } from "react";

import { GameContext } from "../context/GameProvider";

import ResultScore from "../components/results/ResultScore";
import PlayAgainButton from "../components/results/PlayAgainButton";
import BackToMenuButton from "../components/results/BackToMenuButton";

const ResultsPage = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("ResultsPage must be used inside GameProvider");
  }

  const { score } = context;

  return (
    <main>
      <h1>Game Over!</h1>

      <ResultScore score={score} />

      <div>
        <PlayAgainButton />
        <BackToMenuButton />
      </div>
    </main>
  );
};

export default ResultsPage;