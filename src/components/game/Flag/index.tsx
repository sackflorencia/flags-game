import { useContext } from "react";
import { GameContext } from "../../../context/GameProvider";
import "./Flag.css";

const Flag = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("Flag must be used inside GameProvider");
  }

  const { currentCountry, loading } = context;

  if (loading || !currentCountry) {
    return (
      <div className="flag-card">
        <div className="flag-skeleton" aria-busy="true" aria-label="Cargando bandera">
          <div className="skeleton-pulse" />
          <span className="skeleton-text">Cargando bandera...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flag-card">
      <div className="flag-frame">
        <img
          className="flag-image"
          src={currentCountry.flag}
          alt="Bandera a adivinar"
          loading="eager"
        />
      </div>
    </div>
  );
};

export default Flag;
