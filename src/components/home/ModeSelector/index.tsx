import { useContext } from "react";

import { GameContext } from "../../../context/GameProvider";

import ModeButton from "./ModeButton";

import "./ModeSelector.css";

const ModeSelector = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("ModeSelector must be used within GameProvider");
  }

  const { gameMode, setGameMode } = context;

  return (
    <div>
      <ModeButton
        mode="multiple-choice"
        title="Multiple Choice"
        description="Elegí la bandera correcta entre varias opciones."
        selected={gameMode === "multiple-choice"}
        onClick={() => setGameMode("multiple-choice")}
      />

      <ModeButton
        mode="hard"
        title="Hard"
        description="Escribí el nombre del país sin opciones."
        selected={gameMode === "hard"}
        onClick={() => setGameMode("hard")}
      />

      <ModeButton
        mode="capitals"
        title="Capitals"
        description="Adiviná el país a partir de su capital."
        selected={gameMode === "capitals"}
        onClick={() => setGameMode("capitals")}
      />
    </div>
  );
};

export default ModeSelector;