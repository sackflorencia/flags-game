import "./PlayerNameInput.css";

interface PlayerNameInputProps {
  name: string;
  onChange: (name: string) => void;
}

const PlayerNameInput = ({ name, onChange }: PlayerNameInputProps) => {
  return (
    <div className="player-name-field">
      <label htmlFor="player-name" className="player-name-label">
        Nombre o apodo
      </label>

      <input
        id="player-name"
        type="text"
        className="player-name-input"
        value={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Escribí tu nombre..."
        maxLength={20}
        autoComplete="name"
      />
    </div>
  );
};

export default PlayerNameInput;
