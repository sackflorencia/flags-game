import { useContext } from "react";
import { GameContext } from "../../../context/GameProvider";



const Flag = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("Flag must be used inside GameProvider");
  }

  const { currentCountry, loading } = context;

  if (loading || !currentCountry) {
    return <p>Loading flag...</p>;
  }

  return (
    <div>
      <img
        src={currentCountry.flag}
        alt="Flag to guess"
      />
    </div>
  );
};

export default Flag;