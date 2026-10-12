import { useContext } from "react";

import { GameContext } from "../../../context/GameProvider";
import { getLeaderboardByMode } from "../../../services/leaderboardStorage";

const Leaderboard = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("Leaderboard must be used inside GameProvider");
  }
  const { gameMode } = context;

  const leaderboard = getLeaderboardByMode(gameMode);

  return (
    <div>
      <h2>Leaderboard</h2>

      {leaderboard.map((entry, index) => (
        <div key={`${entry.name}-${index}`}>
          <span>{index + 1}</span>
          <span>{entry.name}</span>
          <strong>{entry.score}</strong>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;