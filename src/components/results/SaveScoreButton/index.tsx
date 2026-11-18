import { Bookmark } from "lucide-react";
import "./SaveScoreButton.css";

interface SaveScoreButtonProps {
  onSave: () => void;
  disabled: boolean;
}

const SaveScoreButton = ({ onSave, disabled }: SaveScoreButtonProps) => {
  return (
    <button
      type="button"
      onClick={onSave}
      disabled={disabled}
      className="save-score-btn"
    >
      <Bookmark size={16} strokeWidth={2} />
      <span>Guardar en la Tabla</span>
    </button>
  );
};

export default SaveScoreButton;
