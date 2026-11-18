import type { GameMode } from "../../../../types/game";
import { ListChecks, Keyboard, Landmark, Check } from "lucide-react";
import "./ModeButton.css";

interface ModeButtonProps {
  mode: GameMode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const modeMeta: Record<
  GameMode,
  {
    category: string;
    feature: string;
    icon: typeof ListChecks;
  }
> = {
  "multiple-choice": {
    category: "Opciones",
    feature: "4 alternativas por bandera",
    icon: ListChecks,
  },
  hard: {
    category: "Escritura",
    feature: "Sin pistas, respuesta libre",
    icon: Keyboard,
  },
  capitals: {
    category: "Capitales",
    feature: "Geografía y ciudades del mundo",
    icon: Landmark,
  },
};

const ModeButton = ({
  mode,
  title,
  description,
  selected,
  onClick,
}: ModeButtonProps) => {
  const meta = modeMeta[mode];
  const IconComponent = meta.icon;

  return (
    <button
      type="button"
      className={`mode-card mode-card--${mode} ${selected ? "is-selected" : ""}`}
      onClick={onClick}
      role="radio"
      aria-checked={selected}
    >
      <div className="mode-card__header">
        <div className="mode-card__icon-box">
          <IconComponent size={20} strokeWidth={2} />
        </div>
        <div className="mode-card__radio" aria-hidden="true">
          {selected && <Check size={12} strokeWidth={3} />}
        </div>
      </div>

      <div className="mode-card__body">
        <span className="mode-card__category">{meta.category}</span>
        <h3 className="mode-card__title">{title}</h3>
        <p className="mode-card__desc">{description}</p>
      </div>

      <div className="mode-card__footer">
        <span className="mode-card__feature">{meta.feature}</span>
      </div>
    </button>
  );
};

export default ModeButton;
