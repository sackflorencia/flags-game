import { useContext } from "react";
import { GameContext } from "../../context/GameProvider";

const Flag = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("Flag must be used inside GameProvider");
  }

  const { currentCountry } = context;

  if (!currentCountry) {
    return <p>Loading...</p>;
  }

  return (
    <img
      src={currentCountry.flag}
      alt="Flag to guess"
    />
  );
};

export default Flag;