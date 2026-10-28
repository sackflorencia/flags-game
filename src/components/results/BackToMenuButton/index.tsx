import { useNavigate } from "react-router-dom";

import "./BackToMenuButton.css";

const BackToMenuButton = () => {
  const navigate = useNavigate();

  const handleBackToMenu = () => {
    navigate("/");
  };

  return (
    <button
      type="button"
      onClick={handleBackToMenu}
      className="back-to-menu-btn"
    >
      Back to Menu
    </button>
  );
};

export default BackToMenuButton;