import { useNavigate } from "react-router-dom";
import "./PlayButton.css";

const PlayButton = () => {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate("/game");
  };

  return (
    <button type="button" onClick={handlePlay}>
      Play
    </button>
  );
};

export default PlayButton;