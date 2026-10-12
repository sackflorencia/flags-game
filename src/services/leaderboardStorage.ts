import type { GameMode, LeaderboardEntry } from "../types/game";

const STORAGE_KEY = "flag-guess-leaderboard";

export const getLeaderboard = (): LeaderboardEntry[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
};

export const saveLeaderboardEntry = (
  entry: LeaderboardEntry
): void => {
  const leaderboard = getLeaderboard();

  leaderboard.push(entry);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(leaderboard)
  );
};
export const getLeaderboardByMode = (
  mode: GameMode
): LeaderboardEntry[] => {
  const leaderboard = getLeaderboard();

  return leaderboard
    .filter((entry) => entry.mode === mode)
    .sort((a, b) => b.score - a.score);
};