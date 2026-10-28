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
    return <p>Cargando bandera...</p>;
  }

  return (
    <div className="flag-container">
      <img
        className="flag-image"
        src={currentCountry.flag}
        alt="Flag to guess"
      />
    </div>
  );
};

export default Flag;