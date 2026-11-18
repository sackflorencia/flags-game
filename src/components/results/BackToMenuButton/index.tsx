import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
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
      aria-label="Volver a la pantalla principal"
    >
      <Home size={16} strokeWidth={2} />
      <span>Volver al Menú</span>
    </button>
  );
};

export default BackToMenuButton;
