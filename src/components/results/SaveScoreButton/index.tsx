interface SaveScoreButtonProps {
  onSave: () => void;
  disabled: boolean;
}

const SaveScoreButton = ({
  onSave,
  disabled,
}: SaveScoreButtonProps) => {
  return (
    <button
      type="button"
      onClick={onSave}
      disabled={disabled}
    >
      Save to Leaderboard
    </button>
  );
};

export default SaveScoreButton;