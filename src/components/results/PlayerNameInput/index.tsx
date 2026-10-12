interface PlayerNameInputProps {
  name: string;
  onChange: (name: string) => void;
}

const PlayerNameInput = ({
  name,
  onChange,
}: PlayerNameInputProps) => {
  return (
    <div>
      <label htmlFor="player-name">
        Name
      </label>

      <input
        id="player-name"
        type="text"
        value={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Enter your name"
      />
    </div>
  );
};

export default PlayerNameInput;