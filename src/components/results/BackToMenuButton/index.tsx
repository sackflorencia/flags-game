import { useNavigate } from "react-router-dom";

const BackToMenuButton = () => {
  const navigate = useNavigate();

  const handleBackToMenu = () => {
    navigate("/");
  };

  return (
    <button type="button" onClick={handleBackToMenu}>
      Back to Menu
    </button>
  );
};

export default BackToMenuButton;