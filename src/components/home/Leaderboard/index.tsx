import { useContext } from "react";

import { GameContext } from "../../../context/GameProvider";

import LeaderboardEntry from "./LeaderboardEntry";

import "./Leaderboard.css";

const leaderboard = {
  "multiple-choice": [
    { username: "Florencia", score: 15 },
    { username: "Sofia", score: 13 },
    { username: "Juan", score: 11 },
  ],
  hard: [
    { username: "Sofia", score: 10 },
    { username: "Florencia", score: 9 },
    { username: "Juan", score: 7 },
  ],
  capitals: [
    { username: "Juan", score: 14 },
    { username: "Florencia", score: 12 },
    { username: "Sofia", score: 8 },
  ],
};

const Leaderboard = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("Leaderboard must be used within GameProvider");
  }

  const { gameMode } = context;

  const currentLeaderboard = leaderboard[gameMode];

  return (
    <section>
      <h2>Leaderboard</h2>

      {currentLeaderboard.map((entry, index) => (
        <LeaderboardEntry
          key={entry.username}
          position={index + 1}
          username={entry.username}
          score={entry.score}
        />
      ))}
    </section>
  );
};

export default Leaderboard;