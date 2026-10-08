import type { GameMode } from "../../../../types/game";

import "./ModeButton.css";

interface ModeButtonProps {
  mode: GameMode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const ModeButton = ({
  title,
  description,
  selected,
  onClick,
}: ModeButtonProps) => {
  return (
    <button
      type="button"
      className={selected ? "mode-button selected" : "mode-button"}
      onClick={onClick}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </button>
  );
};

export default ModeButton;